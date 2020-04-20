import Choices from "choices.js";
import * as $  from 'jquery';

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
   customSelectInit();
   initDataSelect();
   initStatsTableBtn();
   initTableSortMobile();
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

function initStatsTableBtn() {
   $('.show-additional-stats').on('click', function (e) {
      e.preventDefault();

      var row = $(this).closest('tr'),
         win = row.find('.win').text(),
         draw = row.find('.draw').text(),
         loose = row.find('.loose').text(),
         match = row.find('.match').text(),
         average = row.find('.average').text();



      if ($(this).hasClass('open')) {
         $(this).removeClass('open');
         $(this).text('+');
         row.next('tr').remove();
      } else {
         var newRow = ` <tr class="additional-row">
               <td colspan="5">               
                  <ul class="additional-list">
                     <li><span>Побед</span><span>${win}</span></li>
                     <li><span>Ничьих</span><span>${draw}</span></li>
                     <li><span>Поражений</span><span>${loose}</span></li>
                     <li><span>За матч</span><span>${match}</span></li>
                     <li><span>Ср. мячей</span><span>${average}</span></li>
                  </ul>
               </td>
            </tr> `;

         $(newRow).insertAfter(row);

         $(this).addClass('open');
         $(this).text('-');
      }



   })
}


function initTableSortMobile() {
   if ($('[data-table-sort]').length) {
      $('[data-table-sort]').on('change', function (e) {
         var thValue = $(this).val()
         var th = `.table_sort th.${thValue}`;

         $('.additional-row').remove();
         $('.show-additional-stats').text('+');
         $(th).trigger('click');
      })
   }

}

/*Сортировка в таблице (добавить таблице класс table_sort*/
document.addEventListener('DOMContentLoaded', () => {

   const getSort = ({target}) => {
      const order = (target.dataset.order = -(target.dataset.order || -1));
      const index = [...target.parentNode.cells].indexOf(target);
      const collator = new Intl.Collator(['en', 'ru'], {numeric: true});
      const comparator = (index, order) => (a, b) => order * collator.compare(
         a.children[index].innerHTML,
         b.children[index].innerHTML
      );

      for (const tBody of target.closest('table').tBodies)
         tBody.append(...[...tBody.rows].sort(comparator(index, order)));

      for (const cell of target.parentNode.cells)
         cell.classList.toggle('sorted', cell === target);
   };

   document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

});


function initDataSelect() {
   var select = $('.select[data-select-init]');
   if (select.length) {

      $('[data-select="1"]').addClass('active-select');
   }

   select.on('change', function () {
      var selector = `[data-select="${$(this).val()}"]`;

      $('[data-select]').removeClass('active-select');

      $(selector).addClass('active-select');
   })
}


function customSelectInit() {
   if ($('select.select').length) {
      const element = document.querySelector('select.select');
      new Choices(element, {
         searchEnabled: false,
         itemSelectText: ''
      });
   }

}

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
   $(".header__burger").on('click touchstart', function (e) {
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

      newsHideItems.forEach(function (item, index) {
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
      const activeTabs = document.querySelectorAll(`.${tabsClassKey}[data-id='${tabId}']`)

      activeTabs.forEach((tab, i) => {
         tab.classList.add('active');
      })
      //tabs[tabId - 1].classList.add('active');
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
