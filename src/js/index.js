import * as $  from 'jquery';

import {
    initPlaceholders,
    initMaskedInput,
    validateForm,
    validateField,
    getMoneyInputValue,
    getMaskedInputValue
} from './components/form';

import {initTabs} from './components/tabs'

$(function () {

   if ($('[data-tabs-block]').length) {
      $(this).each(function () {
         initTabs($(this));
      })
   }

   toggleMainMenu()
});


function toggleMainMenu() {

   $(".header__burger" ).on('click touchstart', function(e) {
      // prevent default anchor click
      e.preventDefault();
      $("body").toggleClass("menu-open");
      $("#hamburger-icon").toggleClass("hamburger-open");
   });
}

