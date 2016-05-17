/*
 * Not using this package from bower because it needs some modifications to
 * play nice with Ember. Not sure how to make it work without modifying here.
 *
 * TODO: Make this work right using bower!
 */

/*!
 * jPushMenu.js
 * 1.1.1
 * @author: takien
 * http://takien.com
 * Original version (pure JS) is created by Mary Lou http://tympanus.net/
 */

(function($) {

  $.fn.jPushMenu = function(customOptions) {
    var o = $.extend({}, $.fn.jPushMenu.defaultOptions, customOptions);

      /* add class to the body.*/

    $('body').addClass(o.bodyClass);
    $(this).addClass('jPushMenuBtn');
    $(this).click(function() {
      var target         = '',
        push_direction     = '';


      if($(this).is('.'+o.showLeftClass)) {
        target         = '.cbp-spmenu-left';
        push_direction = 'toright';
      }
      else if($(this).is('.'+o.showRightClass)) {
        target         = '.cbp-spmenu-right';
        push_direction = 'toleft';
      }
      else if($(this).is('.'+o.showTopClass)) {
        target         = '.cbp-spmenu-top';
      }
      else if($(this).is('.'+o.showBottomClass)) {
        target         = '.cbp-spmenu-bottom';
      }


      $(this).toggleClass(o.activeClass);
      $(target).toggleClass(o.menuOpenClass);

      if($(this).is('.'+o.pushBodyClass)) {
        $('body').toggleClass( 'cbp-spmenu-push-'+push_direction );
      }

        /* disable all other button*/
      $('.jPushMenuBtn').not($(this)).toggleClass('disabled');

      return false;
    });
    var jPushMenu = {
      close: function (o) {
        $('.jPushMenuBtn,body,.cbp-spmenu').removeClass('disabled active cbp-spmenu-open cbp-spmenu-push-toleft cbp-spmenu-push-toright');
      }
    };

    if(o.closeOnClickOutside) {
      $(document).click(function(e) {
        if (e.target.tagName === "A") {
          // don't skip a click on any link
        }
        else if($(e.target).closest('.cbp-spmenu').length) {
          // skip a click on any part of the cbp-spmenu (except <a> tags above)
          return;
        }

        // close the menu
        jPushMenu.close(o);
      });
    }
  };

    /* in case you want to customize class name,
  *  do not directly edit here, use function parameter when call jPushMenu.
  */
  $.fn.jPushMenu.defaultOptions = {
    bodyClass       : 'cbp-spmenu-push',
    activeClass     : 'menu-active',
    showLeftClass   : 'menu-left',
    showRightClass  : 'menu-right',
    showTopClass    : 'menu-top',
    showBottomClass : 'menu-bottom',
    menuOpenClass   : 'cbp-spmenu-open',
    pushBodyClass   : 'push-body',
    closeOnClickOutside: true
  };
})(jQuery);
