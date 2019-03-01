/* eslint-disable no-underscore-dangle */
const csp = require('express-csp');
const express = require('express');
const csrf = require('csurf');
const session = require('express-session');
const extend = require('extend'); // equivalent of $.extend()
const mmm = require('mmm');
const path = require('path');
const utils = require('./src/js/utils');
const crypto = require('crypto');
const getJSONFile = require('./src/js/get-json-file');

const app = express();

const BASE_PATH = process.env.BASEPATH || '/';
const packageJSON = getJSONFile('../../../package.json');

// Used for serving folders that shouldn't be cached for development purposes.
const NO_ETAG = {
  etag: false
};

app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'views'));
app.set('basepath', BASE_PATH);

mmm.setEngine('hogan.js');
app.engine('html', mmm.__express);

// Because you're the type of developer who cares about this sort of thing!
app.enable('strict routing');

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'www'))); // non-generated
app.use('/ids-css', express.static(path.resolve(__dirname, '..', 'node_modules', 'ids-css', 'dist'))); // ids-css import

// Serve pre-generated assets
app.use('/docs', express.static(path.resolve(__dirname, 'docs'), NO_ETAG)); // generated by building documentation
app.use(express.static(path.resolve(__dirname, 'dist'), NO_ETAG)); // app's `/dist` folder (generated by build)
app.use(express.static(path.resolve(__dirname, '..', 'dist'), NO_ETAG)); // project-level `/dist` folder (generated by build)
app.use('/src', express.static(path.resolve(__dirname, '..', 'src'), NO_ETAG)); // project-level `/src` folder for correct SCSS sourcemap linking

const token = crypto.randomBytes(64).toString('hex');

app.use(session({
  secret: token,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false
  }
}));
app.use(csrf());
app.use((req, res, next) => {
  res.locals._csrf = req.csrfToken();
  next();
});

// Create the express router with the same settings as the app.
const router = express.Router({
  strict: true
});

// ===========================================
// Default Options / Custom Middleware
// ===========================================
const DEFAULT_RESPONSE_OPTS = {
  enableLiveReload: true,
  layout: 'layout',
  locale: 'en-US',
  title: 'IDS Enterprise',
  headerHamburger: false,
  appMenuOpen: false,
  basepath: BASE_PATH,
  version: packageJSON.version,
  csp: true,
  nonce: null
};

// Add CSP headers
csp.extend(app);

// Import various custom middleware (order matters!)
app.use(require('./src/js/middleware/request-logger')(app));
app.use(require('./src/js/middleware/option-handler')(app, DEFAULT_RESPONSE_OPTS));
app.use(require('./src/js/middleware/basepath-handler')(app));
app.use(require('./src/js/middleware/global-data-handler')(app));
app.use(require('./src/js/middleware/response-throttler')(app));
app.use(require('./src/js/middleware/remove-headers')(app));
app.use(require('./src/js/middleware/csp-handler')(app));
app.use(require('./src/js/middleware/info-handler')(app));

app.use(router);
app.use(require('./src/js/middleware/error-handler')(app));

const customRoutes = require('./src/js/routes/customRoutes');
const generalRoute = require('./src/js/routes/general');
const sendGeneratedDocPage = require('./src/js/routes/docs');

// ======================================
//  Main Routing and Param Handling
// ======================================
router.get('/', (req, res, next) => {
  res.render('kitchen-sink', res.opts);
  next();
});

router.get('/index', (req, res, next) => {
  const opts = {
    path: path.resolve(__dirname, 'docs', 'index.html')
  };

  if (utils.hasFile(opts.path)) {
    sendGeneratedDocPage(opts, req, res, next);
  }

  res.render('kitchen-sink', res.opts);
});

router.get('/kitchen-sink', (req, res, next) => {
  res.render('kitchen-sink', res.opts);
  next();
});

// =========================================
// Collection of Performance Tests Pages
// =========================================
router.get('/performance-tests', (req, res, next) => {
  const opts = extend({}, res.opts, {
    subtitle: 'Performance Tests'
  });

  res.render('performance-tests/index.html', opts);
  next();
});

// ======================================
//  Components Routes
// ======================================
app.use('/behaviors', generalRoute);
app.use('/components', customRoutes);
app.use('/components', generalRoute);
app.use('/patterns', generalRoute);
app.use('/examples', generalRoute);
app.use('/layouts', generalRoute);
app.use('/tests', generalRoute);
app.use('/utils', generalRoute);

// =========================================
// Fake 'API' Calls for use with AJAX-ready Controls
// =========================================
app.use('/api', require('./src/js/routes/data'));

module.exports = app;
