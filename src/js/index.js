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
   initRateTableBtn();
   initTableSortMobile();
   initTableTooltip();
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
   $('.stats__table:not(.clubs-rate-table) .show-additional-stats').on('click', function (e) {
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
function initRateTableBtn() {
   $('.stats__table.clubs-rate-table .show-additional-stats').on('click', function (e) {
      e.preventDefault();

      var row = $(this).closest('tr'),
         win = row.find('.win').text(),
         draw = row.find('.draw').text(),
         loose = row.find('.loose').text(),
         s1 = row.find('.s1').text(),
         s2 = row.find('.s2').text(),
         s3 = row.find('.s3').text(),
         s4 = row.find('.s4').text(),
         s5 = row.find('.s5').text(),
         s6 = row.find('.s6').text(),
         s7 = row.find('.s7').text(),
         s8 = row.find('.s8').text();

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
                     <li><span>Очков в Серии #1</span><span>${s1}</span></li>
                     <li><span>Очков в Серии #2</span><span>${s2}</span></li>
                     <li><span>Очков в Серии #3</span><span>${s3}</span></li>
                     <li><span>Очков в Серии #4</span><span>${s4}</span></li>
                     <li><span>Очков в Серии #5</span><span>${s5}</span></li>
                     <li><span>Очков в Серии #6</span><span>${s6}</span></li>
                     <li><span>Очков в Серии #7</span><span>${s7}</span></li>
                     <li><span>Очков в Серии #8</span><span>${s8}</span></li>
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
         $('.show-additional-stats').text('+').removeClass('open');
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
   var tr = $('[data-href]');

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
   const sec = document.getElementsByClassName(sectionClass);
   const sectionClassName = '.' + sectionClass;

   [...tabs].forEach(tab => tab.addEventListener('click', tabClick));

   function tabClick(event) {
      const tabId = event.target.dataset.id;

      //$(sectionClassName).removeClass('active');
      [...sec].forEach((tab, i) => {
         tab.classList.remove('active');
      });

      [...tabs].forEach((tab, i) => {
         tab.classList.remove('active');
      });

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


function initTableTooltip() {
   if ($(document).width() >= 1000 && $('[data-tooltip]').length)  {
      let tooltipElem;

      document.onmouseover = function(e) {
         let target = e.target;

         // если у нас есть подсказка...
         let tooltipHtml = target.dataset.tooltip;
         if (!tooltipHtml) return;

         // ...создадим элемент для подсказки

         tooltipElem = document.createElement('div');
         tooltipElem.className = 'tooltip';
         tooltipElem.innerHTML = tooltipHtml;
         document.body.append(tooltipElem);

         // спозиционируем его сверху от аннотируемого элемента (top-center)
         let coords = target.getBoundingClientRect();

         let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
         if (left < 0) left = 0; // не заезжать за левый край окна

         let top = coords.top - tooltipElem.offsetHeight + 55;
         if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
            top = coords.top + target.offsetHeight + 5;
         }

         tooltipElem.style.left = left + 'px';
         tooltipElem.style.top = top + 'px';
      };

      document.onmouseout = function(e) {

         if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
         }

      };
   }

}
