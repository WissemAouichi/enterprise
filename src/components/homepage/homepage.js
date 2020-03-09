import * as debug from '../../utils/debug';
import { utils } from '../../utils/utils';
import { Locale } from '../locale/locale';

// Default Settings
const COMPONENT_NAME = 'homepage';

/**
* The Homepage handles card layout at multiple breakpoints.
*
* @class Homepage
* @constructor
* @param {HTMLElement} element The component element.
* @param {object} [settings] The component settings.
* @param {boolean} [settings.animate] Disable animation during resize
* @param {number} [settings.columns] Display in 3 (default) or 4 column layout
* @param {string} [settings.easing]
* @param {number} [settings.gutterSize]
* @param {number} [settings.widgetWidth]
* @param {number} [settings.widgetHeight]
* @param {number} [settings.timeout]
*/
const HOMEPAGE_DEFAULTS = {
  animate: true,
  columns: 3,
  editing: false, // Private
  easing: 'blockslide', // Private
  gutterSize: 20, // Private
  widgetWidth: 360, // Private
  widgetHeight: 370, // Private
  timeout: 100 // Private
};

function Homepage(element, settings) {
  this.settings = utils.mergeSettings(element, settings, HOMEPAGE_DEFAULTS);
  this.element = $(element);
  debug.logTimeStart(COMPONENT_NAME);
  this.init();
  debug.logTimeEnd(COMPONENT_NAME);
}

// Homepage Methods
Homepage.prototype = {

  /**
   * @name Homepage#rowsAndCols
   * @type Array
   * @default []
   * @readonly
   * Stores information about the current number of rows and columns that make up the Homepage layout.
   * Each entry in the array
   */

  /**
   * @returns {object} containing information about the current state of the Homepages component.
   */
  get state() {
    let rows = this.rowsAndCols.length;
    const cols = rows ? this.rowsAndCols[0].length : 0;
    const settings = this.settings;

    const lastRow = this.rowsAndCols[rows - 1];
    if (lastRow.indexOf(false) === -1) {
      rows -= 1;
    }

    function getContainerHeight() {
      const topGutter = settings.gutterSize;
      return topGutter + ((settings.gutterSize) + (settings.widgetHeight)) * rows;
    }

    return {
      rows,
      cols,
      containerHeight: getContainerHeight(),
      matrix: this.rowsAndCols,
      editing: this.editing
    };
  },

  /**
   * @private
   * @returns {void}
   */
  init() {
    this.isTransitionsSupports = this.supportsTransitions();
    this.initHeroWidget();
    this.handleEvents();
    this.initEdit();

    // Initial Sizing
    this.resize(this, false);
  },

  /**
   * Initialize columns.
   * @private
   * @param {number} row to be initialize.
   * @returns {void}
   */
  initColumns(row) {
    row = row || 0;
    this.rowsAndCols[row] = [];

    for (let i = 0, l = this.settings.columns; i < l; i++) {
      this.rowsAndCols[row][i] = true;// Make all columns available in first row[true]
    }
  },

  /**
   * Initialize hero widget.
   * @private
   * @returns {void}
   */
  initHeroWidget() {
    let heroWidget = $('.hero-widget');
    if (heroWidget.length > 1) {
      heroWidget = heroWidget.not(':first').remove();
    }
    this.heroWidget = heroWidget;
  },

  /**
   * Initialize rows and cols.
   * @private
   * @returns {void}
   */
  initRowsAndCols() {
    this.rowsAndCols = [];// Keeping all blocks as rows and columns
    this.initColumns();
  },

  /**
   * Initialize guide and drag event listeners.
   * @private
   * @returns {void}
   */
  initEdit() {
    const homepage = this;
    const cards = homepage.element.find('.card, .widget');
    if (homepage.editing) {
      cards.attr('draggable', true);
      cards.css('cursor', 'move');

      homepage.guide = $('<div>').addClass('drop-indicator').append(`
      <div class='edge'></div>
      <div class='line'></div>
      <div class='edge'></div>
      `);

      cards
        .on('mouseenter.card', function () {
          const card = $(this);
          const eastHandle = $('<div>').addClass('ui-resizable-handle ui-resizable-e')
            .drag({ axis: 'x' })
            .on('dragstart.handle', (dragevent) => {
              dragevent.preventDefault();
              card.addClass('ui-resize-passive');
              card.css({ opacity: 0.9, zIndex: 90 });
              $(window)
                .on('mousemove.handle', (mouseevent) => {
                  const width = mouseevent.clientX - card.offset().left;
                  if (width < homepage.settings.widgetWidth / 2) {
                    eastHandle.css({ left: homepage.settings.widgetWidth / 2 });
                  } else {
                    card.width(width);
                  }
                })
                .on('mouseup.handle', () => {
                  card.removeClass('ui-resize-passive');
                  card.css({ zIndex: 'auto' });
                  $(window)
                    .off('mousemove.handle')
                    .off('mouseup.handle');

                  card.removeClass('double-width triple-width quad-width');
                  const widthUnits = card.width() / homepage.settings.widgetWidth;
                  if (widthUnits > 3.5) {
                    card.addClass('quad-width');
                  } else if (widthUnits > 2.5) {
                    card.addClass('triple-width');
                  } else if (widthUnits > 1.5) {
                    card.addClass('double-width');
                  }

                  $('.ui-resizable-handle').remove();
                  card.css({ opacity: 1, width: '' });
                  homepage.refresh(false);
                });
            });
          const southHandle = $('<div>').addClass('ui-resizable-handle ui-resizable-s')
            .drag({ axis: 'y' })
            .on('dragstart.handle', (dragevent) => {
              dragevent.preventDefault();
              card.addClass('ui-resize-passive');
              card.css({ opacity: 0.9, zIndex: 90 });
              $(window)
                .on('mousemove.handle', (mouseevent) => {
                  const height = mouseevent.clientY - card.offset().top;
                  if (height < homepage.settings.widgetHeight) {
                    southHandle.css({ top: homepage.settings.widgetHeight });
                  } else {
                    card.height(height);
                  }
                })
                .on('mouseup.handle', () => {
                  card.removeClass('ui-resize-passive');
                  card.css({ zIndex: 'auto' });
                  $(window)
                    .off('mousemove.handle')
                    .off('mouseup.handle');

                  card.removeClass('double-height');
                  const heightUnits = card.height() / homepage.settings.widgetHeight;
                  if (heightUnits > 1.5) {
                    card.addClass('double-height');
                  }

                  $('.ui-resizable-handle').remove();
                  card.css({ opacity: 1, height: '' });
                  homepage.refresh(false);
                });
            });
          if (card.has('.ui-resizable-handle').length === 0) {
            card.append(eastHandle, southHandle);
          }
          card.css({ border: '1px solid #078cd9' });
        })
        .on('mouseleave.card', function () {
          const card = $(this);
          if (!card.hasClass('ui-resize-passive')) {
            $('.ui-resizable-handle').remove();
          }
          card.css({ border: '1px solid #bdbdbd' });
        })
        .on('dragstart.card', function () {
          const card = $(this);
          card.addClass('is-dragging');
        })
        .on('dragenter.card', function (event) {
          event.preventDefault();
          const card = $(this);
          const draggingCard = $('.is-dragging');

          // Ignore intial trigger when current card is dragging over itself
          if (card.is(draggingCard) && $('.drop-indicator').length === 0) {
            return;
          }

          if (draggingCard.index() < card.index()) {
            homepage.guide.css('right', '-14px');
            homepage.guide.css('left', '');
          } else {
            homepage.guide.css('left', '-14px');
            homepage.guide.css('right', '');
          }
          card.append(homepage.guide);
          homepage.refresh(false);
        })
        .on('dragend.card', function () {
          const card = $(this);
          const cardOver = $(cards).has('.drop-indicator');
          if (card.index() < cardOver.index()) {
            card.insertAfter(cardOver);
          } else {
            card.insertBefore(cardOver);
          }
          card.removeClass('is-dragging');
          homepage.guide.remove();
          homepage.refresh(false);
        });
    } else {
      cards.attr('draggable', false);
      cards.css('cursor', 'auto');
      cards.off('mouseenter.card mouseleave.card dragstart.card dragenter.card dragend.card')
    }
  },

  /**
   * Set edit for rearranging/reordering cards.
   * @param {boolean} edit mode
   * @returns {void}
   */
  setEdit(edit) {
    if (edit !== undefined) {
      this.editing = edit;
      this.initEdit();
      this.refresh(false);
    }
  },

  /**
   * Get availability where we can fit this given block.
   * @private
   * @param {object} block to get availability.
   * @returns {object} [x and y] where we can fit this block
   */
  getAvailability(block) {
    let abort = false;
    const smallest = {};
    const rows = this.rowsAndCols.length;

    // Loop thru each row and column soon it found first available spot
    // Then check for if block's width can fit in(yes), asign to [smallest] and break both loops
    for (let i = 0, l = rows; i < l && !abort; i++) {
      for (
        let j = 0, innerCheck = true, cols = this.rowsAndCols[i].length;
        j < cols && !abort;
        j++
      ) {
        if ((this.rowsAndCols[i][j]) && ((block.w + j) <= cols)) {
          if ((block.w > 1) && (cols > (j + 1))) {
            for (let n = 0; n < block.w; n++) {
              if (!this.rowsAndCols[i][j + n]) {
                innerCheck = false;
                break;
              }
            }
          }
          if ((block.h > 1) && (rows > (i + 1))) {
            for (let n = 0; n < block.h; n++) {
              if (!this.rowsAndCols[i + n][j]) {
                innerCheck = false;
                break;
              }
            }
          }
          if (innerCheck) {
            smallest.row = i;
            smallest.col = j;
            abort = true;
          }
        }
      }
    }

    // If did not found any available spot from previous loops
    // Add new row and asign to [smallest] first column in this new row
    if (!Object.getOwnPropertyNames(smallest).length) {
      this.initColumns(rows);
      smallest.row = rows;
      smallest.col = 0;
    }

    return smallest; // {x:0, y:0}
  },

  /**
   * Make all spots as unavailable, depends on block's width and height
   * Soon we used this block
   * @private
   * @param {number} r as row.
   * @param {number} c as col.
   * @param {number} block to fit.
   * @returns {void}
   */
  fitBlock(r, c, block) {
    let addRow = true;

    block.x = c;
    block.y = r;

    if ((block.w === 1) && (block.h === 1)) { // Single block can fit anywhere
      this.rowsAndCols[r][c] = false;
    } else if (block.w !== 1) {
      // If more then one row or column then loop thru to block's width and height
      // If height is more then current rows then add new row
      // Mark those spots as unavailable[false]

      // Left to right
      for (let i = r, l = block.h + r; i < l; i++) {
        for (let j = c, l2 = block.w + c; j < l2; j++) {
          if (!this.rowsAndCols[i]) {
            this.initColumns(i);
          }
          this.rowsAndCols[i][j] = false;
        }
      }
    } else {
      // Top to bottom
      for (let i = r, l = block.h + r; i < l; i++) {
        for (let j = c, l2 = block.h + c; j < l2; j++) {
          if (!this.rowsAndCols[i]) {
            this.initColumns(i);
          }
          this.rowsAndCols[i][c] = false;
        }
      }
    }

    // Check if reach to end of columns then assign flag[addRow]
    for (let i = 0, l = this.rowsAndCols[r].length; i < l; i++) {
      if (this.rowsAndCols[r][i]) {
        addRow = false;
      }
    }

    // If reach to end of columns and next row is not avaiable then add new row
    // Make all columns available, if not assigned earlier as unavailable
    if (addRow) {
      if (!this.rowsAndCols[r + 1]) {
        this.initColumns(r + 1);
      }
    }
  },

  /**
   * Setup each block sizes, based on classes provided from markup
   * @private
   * @returns {void}
   */
  setBlocks() {
    const cards = this.element.find('.card, .widget');
    this.blocks = [];

    for (let i = 0, l = cards.length; i < l; i++) {
      const card = $(cards[i]);
      const h = card.hasClass('double-height') ? 2 : 1;
      let w;

      if (card.hasClass('quad-width')) {
        w = 4;
      } else if (card.hasClass('triple-width')) {
        w = 3;
      } else if (card.hasClass('double-width')) {
        w = 2;
      } else {
        w = 1;
      }

      this.blocks.push({ w, h, elem: card, text: card.text() });
    }

    // Max sized columns brings to top
    if (this.settings.columns > 1) {
      for (let i = 0, j = 0, w = 0, l = this.blocks.length; i < l; i++) {
        if (this.blocks[i].w >= this.settings.columns && i &&
          w && (w <= (this.settings.columns / 2))) {
          this.arrayIndexMove(this.blocks, i, j);
        }
        w += this.blocks[i].w;
        if (w >= this.settings.columns) {
          w = 0; // reset
          j = (this.blocks[j].w >= this.settings.columns) ? j + 1 : i; // record to move
        }
      }
    }
  },

  /**
   * Move an array element position
   * @private
   * @param {array} arr .
   * @param {number} from index.
   * @param {number} to index.
   * @returns {void}
   */
  arrayIndexMove(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
  },

  /**
   * Resize Method
   * @private
   * @param {object} self .
   * @param {boolean} animate .
   * @returns {void}
   */
  resize(self, animate) {
    // Sizes of "breakpoints" is  320, 660, 1000 , 1340 (for 320)
    // or 360, 740, 1120, 1500 or (for 360)
    const bpXL = (self.settings.widgetWidth * 4) + (self.settings.gutterSize * 3);
    const bpDesktop = (self.settings.widgetWidth * 3) + (self.settings.gutterSize * 2);
    const bpTablet = (self.settings.widgetWidth * 2) + self.settings.gutterSize;
    const bpPhone = self.settings.widgetWidth;

    let bp = bpXL; // 1340
    // Math min against window.screen.width for single line mobile support
    const elemWidth = self.element.outerWidth();

    // elemWidth -= 30; //extra break space

    // Find the Breakpoints
    const xl = (elemWidth >= bpXL);
    const desktop = (elemWidth >= bpDesktop && elemWidth <= bpXL);
    const tablet = (elemWidth >= bpTablet && elemWidth <= bpDesktop);
    const phone = (elemWidth <= bpTablet);

    const maxAttr = this.element.attr('data-columns');
    const content = self.element.find('> .content');
    this.settings.columns = parseInt((maxAttr || this.settings.columns), 10);

    // Assign columns as breakpoint sizes
    if (xl && self.settings.columns === 4) {
      self.settings.columns = 4;
      bp = bpXL;
    }
    if ((desktop) || (xl && self.settings.columns === 3)) {
      self.settings.columns = 3;
      bp = bpDesktop;
    }
    if (tablet) {
      self.settings.columns = 2;
      bp = bpTablet;
    }
    if (phone) {
      self.settings.columns = 1;
      bp = bpPhone;
    }

    if (content.length) {
      content[0].style.marginLeft = `-${(bp / 2)}px`;
    }

    this.setBlocks(); // setup blocks
    this.initRowsAndCols(); // setup colums

    // Loop thru each block, make fit where available and
    // If block more wider than available size, make as  available size
    // Assign new left and top css positions
    for (let i = 0, l = self.blocks.length; i < l; i++) {
      // let left, top, pos, available,
      const block = self.blocks[i];

      // Remove extra classes if assigned earlier
      block.elem.removeClass('to-single to-double to-triple');

      // If block more wider than available size, make as available size
      if (block.w > self.settings.columns) {
        block.w = self.settings.columns;

        if (self.settings.columns === 1) {
          block.elem.addClass('to-single');
        } else if (self.settings.columns === 2) {
          block.elem.addClass('to-double');
        } else if (self.settings.columns === 3) {
          block.elem.addClass('to-triple');
        }
      }

      // Get Availability
      const available = self.getAvailability(block);

      // Set positions
      const box = self.settings.widgetWidth + self.settings.gutterSize;
      const totalWidth = box * self.settings.columns;

      const left = Locale.isRTL() ? totalWidth - ((box * block.w) + (box * available.col)) : box * available.col;// eslint-disable-line
      const top = (self.settings.widgetHeight + self.settings.gutterSize) * available.row;
      const pos = { left, top };

      if (animate && !this.editing) {
        const easing = self.settings.easing;
        const blockslide = [0.09, 0.11, 0.24, 0.91];

        if (easing === 'blockslide') {
          if (self.isTransitionsSupports) {
            self.applyCubicBezier(block.elem, blockslide);
            block.elem[0].style.left = `${pos.left}px`;
            block.elem[0].style.top = `${pos.top}px`;
          } else {
            // IE-9
            block.elem.animate(pos, self.settings.timeout);
          }
        } else {
          // Other easing effects ie (linear, swing)
          block.elem.animate(pos, self.settings.timeout, easing);
        }
      } else {
        if (self.isTransitionsSupports) {
          self.applyCubicBezier(block.elem, null);
        }
        block.elem[0].style.left = `${pos.left}px`;
        block.elem[0].style.top = `${pos.top}px`;
      }

      // Mark all spots as unavailable for this block, as we just used this one
      self.fitBlock(available.row, available.col, block);
    }

    /**
    * Fires after the page is resized and layout is set.
    * Can be used for any special adjustments.
    * @event resize
    * @memberof Homepage
    * @type {object}
    * @param {object} event The jquery event object
    * @param {number} columns The number of columns provided by this instance's settings
    * @param {object} metadata A compilation of current state information from the instance.
    */
    self.element.triggerHandler('resize', [self.settings.columns, self.state]);
  },

  /**
   * Apply cubic-bezier effects
   * @private
   * @param {object} el as element.
   * @param {string} cubicBezier effect to apply.
   * @returns {void}
   */
  applyCubicBezier(el, cubicBezier) {
    const value = cubicBezier ? `all .3s cubic-bezier(${cubicBezier})` : 'none';
    el[0].style['-webkit-transition'] = value;
    el[0].style['-moz-transition'] = value;
    el[0].style['-ms-transition'] = value;
    el[0].style['-o-transition'] = value;
    el[0].style.transition = value;
  },

  /**
   * Check if browser supports transitions
   * @private
   * @returns {boolean} true if supports transitions
   */
  supportsTransitions() {
    const s = document.createElement('p').style;
    let p = 'transition';

    if (typeof s[p] === 'string') {
      return true;
    }

    // Tests for vendor specific prop
    const v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (let i = 0, l = v.length; i < l; i++) {
      if (typeof s[v[i] + p] === 'string') {
        return true;
      }
    }
    return false;
  },

  /**
   * Refresh resize calculations to update any changes.
   * @param {boolean} animate False will disable animation during refresh
   * @returns {void}
   */
  refresh(animate) {
    animate = typeof animate !== 'undefined' ? animate : this.settings.animate;
    this.resize(this, animate);
  },

  /**
   * Detach events
   * @private
   * @returns {void}
   */
  detachEvents() {
    $('body').off('resize.homepage');
    $('.application-menu').off('applicationmenuopen.homepage applicationmenuclose.homepage');
  },

  /**
   * Resync the UI and Settings.
   * @param {object} settings The settings to apply.
   * @returns {object} The api
   */
  updated(settings) {
    if (typeof settings !== 'undefined') {
      this.settings = utils.mergeSettings(this.element, settings, HOMEPAGE_DEFAULTS);
    }
    return this
      .detachEvents()
      .init();
  },

  /**
   * Destroy this component instance and remove the link from its base element.
   * @returns {void}
   */
  destroy() {
    this.detachEvents();
    $.removeData(this.element[0], COMPONENT_NAME);
  },

  /**
   * Attach Events used by the Control
   * @private
   * @returns {void}
   */
  handleEvents() {
    $('body').on('resize.homepage', () => {
      this.resize(this, this.settings.animate);
    });

    $('.application-menu').on('applicationmenuopen.homepage applicationmenuclose.homepage', () => {
      this.resize(this, this.settings.animate);
    });
  }

};

export { Homepage, COMPONENT_NAME };
