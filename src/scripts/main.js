'use strict';

$(document).ready(function() {
  var navShowing = false;
  var $menu = $('.mobile-menu');
  $('.hamburger').click(function() {
    if (navShowing) {
      $menu.slideUp();
      navShowing = false;
    } else {
      $menu.slideDown();
      navShowing = true;
    }
  });
});
