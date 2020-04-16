import * as $  from 'jquery';


import {initTabs} from './components/tabs'

$(function () {

   if ($('[data-tabs-block]').length) {
      $(this).each(function () {
         initTabs($(this));
      })
   }

   toggleMainMenu();
   initAdditionalTabs('tab-add', 'tab-2');
   initAdditionalTabs('tab-add-2', 'tab-3');
});



/* Открытие / закрытие меню в мобильной версии */
function toggleMainMenu() {
   $(".header__burger" ).on('click touchstart', function(e) {
      e.preventDefault();
      $("body").toggleClass("menu-open");
   });
}

/* Инициализация дополнительных табов(внутри табов) */
function initAdditionalTabs(tabsClassKey, sectionClass) {
   const tabs = document.getElementsByClassName(tabsClassKey);
   const sectionClassName = '.' + sectionClass;

   [...tabs].forEach(tab => tab.addEventListener('click', tabClick));

   function tabClick(event) {
      const tabId = event.target.dataset.id;

      $(sectionClassName).removeClass('active');

      [...tabs].forEach((tab, i) => {
         tab.classList.remove('active');

      })

      tabs[tabId - 1].classList.add('active');
      const section = document.querySelectorAll(`.${sectionClass}[data-id='${tabId}']`)

      section.forEach((tab, i) => {
         tab.classList.add('active');
      })
   }
}
