/**
* Application Nav Control (TODO: bitly link to soho xi docs)
*/

/* start-amd-strip-block */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
/* end-amd-strip-block */

  $.fn.applicationmenu = function(options) {

    'use strict';

    // Settings and Options
    var pluginName = 'applicationmenu',
        defaults = {
          openOnLarge: false, // If true, will automatically open the Application Menu when a large screen-width breakpoint is met.
          triggers: [] // An Array of jQuery-wrapped elements that are able to open/close this nav menu.
        },
        settings = $.extend({}, defaults, options);

    // Plugin Constructor
    function ApplicationMenu(element) {
      this.settings = $.extend({}, settings);
      this.element = $(element);
      this.init();
    }

    // Plugin Methods
    ApplicationMenu.prototype = {

      init: function() {
        this
          .setup()
          .handleEvents();
      },

      setup: function() {
        this.hasTrigger = false;
        this.isAnimating = false;
        this.triggers = $();

        this.menu = this.element;

        var openOnLarge = this.element.attr('data-open-on-large');
        this.settings.openOnLarge = openOnLarge !== undefined ? openOnLarge === 'true' : this.settings.openOnLarge;

        // Pull in the list of Nav Menu trigger elements and store them internally.
        this.modifyTriggers(this.settings.triggers, false, true);

        this.scrollTarget = this.menu.parents('.header');
        if (this.menu.parents('.masthead').length > 0) {
          this.scrollTarget = this.menu.parents('.masthead');
          this.menu.addClass('short');
        }

        this.accordion = this.menu.find('.accordion');

        this.originalParent = this.menu.parent();
        this.menu.detach().insertAfter($('body').find('header').first());
        this.adjustHeight();

        return this;
      },

      handleEvents: function() {
        var self = this;

        // Setup click events on this.element if it's not the menu itself
        // (this means that it's a trigger button)
        if (this.triggers.length) {
          this.triggers.on('touchend.applicationmenu touchcancel.applicationmenu', function(e) {
            e.preventDefault();
            $(e.target).click();
          }).on('click.applicationmenu', function() {
            if (!self.menu.hasClass('is-open') && self.isAnimating === false) {
              self.openMenu();
            }
          });
        }

        // Setup notification change events
        this.menu.on('notify.applicationmenu', function(e, anchor, value) {
          self.notify(anchor, value);
        });

        this.accordion.on('blur.applicationmenu', function() {
          self.closeMenu();
        });

        $(document).on('open-applicationmenu', function() {
          self.openMenu();
        }).on('close-applicationmenu', function() {
          self.closeMenu();
        });

        $(window).on('scroll.applicationmenu', function() {
          self.adjustHeight();
        });

        if (this.settings.openOnLarge) {
          $(window).on('resize.applicationmenu', function() {
            self.testWidth();
          });

          // Do an initial width test to roll the menu out if our breakpoint is the higher one
          this.menu.addClass('no-transition');
          $('.page-container').addClass('no-transition');
          this.testWidth();
        }

        return this;
      },

      handleKeyDown: function(e) {
        var key = e.which;

        if (key === 27) { // Escape
          e.preventDefault();
          this.closeMenu();
          if (this.triggers.length) {
            this.triggers.eq(0).focus();
          }
          return false;
        }
      },

      notify: function(anchor, value) {
        if (!anchor || anchor === undefined) {
          return;
        }
        if (anchor instanceof HTMLElement) {
          anchor = $(anchor);
        }
        if (!anchor.is('a')) {
          return;
        }

        var tag = anchor.find('.tag');

        // Close the tag if an undefined or '0' value is passed
        if (!value || value === undefined || parseInt(value, 10) === 0) {
          if (tag.length) {
            tag.remove();
          }
          return;
        }

        if (!tag.length) {
          tag = $('<span class="tag"></span>').appendTo(anchor);
        }

        tag.text(value.toString());
        return tag;
      },

      adjustHeight: function() {
        var isSticky = this.scrollTarget.is('.is-sticky'),
          offset = this.scrollTarget.height() - (!isSticky ? $(window).scrollTop() : 0);
        this.menu.css('height', (offset > 0 ? 'calc(100% - ' + offset + 'px)' : '100%'));
      },

      isLargerThanBreakpoint: function() {
        return $(window).width() > 1280;
      },

      testWidth: function() {
        if (this.isLargerThanBreakpoint()) {
          if (!this.menu.hasClass('is-open') && this.isAnimating === false) {
            this.openMenu(true);
          }
        } else {
          if (!this.element.find(document.activeElement).length && this.menu.is('.is-open') && this.isAnimating === false) {
            this.closeMenu();
          }
        }
      },

      openMenu: function(noFocus) {
        if (this.isAnimating === true) {
          return;
        }

        var self = this,
          transitionEnd = $.fn.transitonEndName;

        this.isAnimating = true;

        function isOpen() {
          if (self.timeout !== null) {
            clearTimeout(self.timeout);
            self.timeout = null;
          }

          self.isAnimating = false;
          self.element.trigger('applicationmenuopen');
          self.menu.removeClass('no-transition');
          $('.page-container').removeClass('no-transition');
        }

        this.menu
          .off(transitionEnd + '.applicationmenu')
          .css('display', '');
        // next line forces a repaint
        this.menu[0].offsetHeight; //jshint ignore:line
        this.menu.addClass('is-open');

        if (!noFocus || noFocus !== true) {
          this.menu.find('.is-selected > a').focus();
        }

        this.menu.one(transitionEnd + '.applicationmenu', isOpen);
        this.timeout = setTimeout(isOpen, 300);

        // Events that will close the nav menu
        // On a timer to prevent conflicts with the Trigger button's click events
        setTimeout(function() {
          $(document).on('touchend.applicationmenu touchcancel.applicationmenu', function(e) {
            e.preventDefault();
            $(e.target).click();
          }).on('click.applicationmenu', function(e) {
            if ($(e.target).parents('.application-menu').length < 1) {
              self.closeMenu($(e.target).hasClass('application-menu-trigger'));
            }
          }).on('keydown.applicationmenu', function(e) {
            self.handleKeyDown(e);
          });
        }, 0);
      },

      closeMenu: function(force) {
        if (this.isAnimating === true) {
          return;
        }

        if (!force && this.settings.openOnLarge === true && this.isLargerThanBreakpoint() === true) {
          return;
        }

        var self = this,
          transitionEnd = $.fn.transitionEndName();

        this.isAnimating = true;

        function close() {
          if (self.timeout !== null) {
            clearTimeout(self.timeout);
            self.timeout = null;
          }

          self.menu
            .off(transitionEnd + '.applicationmenu')
            .css('display', 'none');
          self.isAnimating = false;
          self.element.trigger('applicationmenuclose');
        }

        this.menu.one(transitionEnd + '.applicationmenu', close);
        this.timeout = setTimeout(close, 300);

        this.menu.removeClass('is-open').find('[tabindex]');
        $(document).off('touchend.applicationmenu touchcancel.applicationmenu click.applicationmenu keydown.applicationmenu');
      },

      // Externally Facing function that can be used to add/remove application nav menu triggers.
      // If the 'remove' argument is defined, triggers that are defined will be removed internally instead of added.
      // If the 'norebuild' argument is defined, this control's events won't automatically be rebound to include
      // the new triggers.
      modifyTriggers: function(triggers, remove, norebuild) {
        if (!triggers || !triggers.length) {
          return;
        }
        var changed = $();

        $.each(triggers, function(i, obj) {
          changed = changed.add($(obj));
        });

        this.triggers = !remove ? this.triggers.add(changed) : this.triggers.not(changed);

        if (norebuild && norebuild === true) {
          return;
        }

        this.updated();
      },

      unbind: function() {
        this.accordion.off('blur.applicationmenu');
        this.menu.off('animateOpenComplete animateClosedComplete');
        $(window).off('scroll.applicationmenu');
        $(document).off('touchend.applicationmenu touchcancel.applicationmenu click.applicationmenu open-applicationmenu close-applicationmenu');

        return this;
      },

      updated: function() {
        this
          .unbind()
          .handleEvents();
      },

      // Teardown - Remove added markup and events
      destroy: function() {
        this.unbind();
        this.menu
          .detach()
          .appendTo(this.originalParent)
          .removeClass('short')
          .removeAttr('style');
        $.removeData(this.element[0], pluginName);
      }
    };

    // Initialize the plugin (Once)
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (instance) {
        instance.settings = $.extend({}, instance.settings, options);
        instance.updated();
      } else {
        instance = $.data(this, pluginName, new ApplicationMenu(this, settings));
      }
    });
  };

/* start-amd-strip-block */
}));
/* end-amd-strip-block */
