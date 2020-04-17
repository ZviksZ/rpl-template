import * as $ from 'jquery';
window.jQuery = $;
import 'slick-carousel';
require("@fancyapps/fancybox");

import {initTabs} from './components/tabs'

$(function () {

   if ($('[data-tabs-block]').length) {
      $(this).each(function () {
         initTabs($(this));
      })
   }

   toggleMainMenu();
   initMoreNewsBtn();
   initAdditionalTabs('tab-add', 'tab-2');
   initAdditionalTabs('tab-add-2', 'tab-3');

   gallerySliderInit();

   initTableRowLink();


   $('[data-fancybox="gallery"]').fancybox({
      openSpeed: 10,
      openEffect: 'none',
      openMethod: 'zoomIn',
      animationEffect: "fade",
      animationDuration: 0,
      buttons: [
         "slideShow",
         "thumbs",
         "close"
      ],
   });
});

function initTableRowLink() {
   var tr = $('tr[data-href]');

   if (tr.length) {
      tr.on('click', function () {
         var href = $(this).data('href');

         window.location = href;
      })
   }
}

/* Открытие / закрытие меню в мобильной версии */
function toggleMainMenu() {
   $(".header__burger" ).on('click touchstart', function(e) {
      e.preventDefault();
      $("body").toggleClass("menu-open");
   });
}

/* Инициализация кнопки "Показать еще" для новостей */
function initMoreNewsBtn() {
   var btn = $('#show-more__btn');

   if (!document.querySelectorAll('.news-block .news-hide').length) {
      btn.hide()
   }
   btn.on('click', function (e) {
      e.preventDefault();
      var newsHideItems = document.querySelectorAll('.news-block .news-hide');

      if (!newsHideItems.length) {
         $(this).hide();
      }

      newsHideItems.forEach(function (item,index) {
         if ($(document).width() >= 1000) {
            if (index >= 0 && index <= 3) {
               item.classList.remove('news-hide')
            }
         } else if ($(document).width() < 1000 && $(document).width() > 760) {
            if (index >= 0 && index <= 1) {
               item.classList.remove('news-hide')
            }
         } else {
            if (index === 0) {
               item.classList.remove('news-hide')
            }
         }
      })

      setTimeout(function () {
         var newsNewHideItems = document.querySelectorAll('.news-block .news-hide');
         if (!newsNewHideItems.length) {
            $('#show-more__btn').hide();
         }
      }, 0)

   })
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




function gallerySliderInit() {
   $('.gallery .row').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true
   });
}
