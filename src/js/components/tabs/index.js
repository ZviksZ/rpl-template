import * as $ from 'jquery';

function initTabs($tabs) {
   if (!$tabs) return;
   let defaultTab = $tabs.attr('data-default-tab');

   if ( $tabs.find('[data-tab]').closest('[data-select]').length) {
      if ($tabs.find('[data-tab]').closest('[data-select]').hasClass('active-select')) {
         if (!defaultTab) {
            if ($tabs.find('.active-select [data-tab]').hasClass('active')) {
               defaultTab = $tabs.find('.active-select .active[data-tab]').attr('data-tab');
            } else {
               defaultTab = $tabs.find('.active-select [data-tab]').first().attr('data-tab');
            }
         }
      }
   } else {
      if (!defaultTab) {
         if ($tabs.find('[data-tab]').hasClass('active')) {
            defaultTab = $tabs.find('.active[data-tab]').attr('data-tab');
         } else {
            defaultTab = $tabs.find('[data-tab]').first().attr('data-tab');
         }
      }
   }


   /*if (!defaultTab) {
      if ($tabs.find('[data-tab]').hasClass('active')) {
         defaultTab = $tabs.find('.active[data-tab]').attr('data-tab');
      } else {
         defaultTab = $tabs.find('[data-tab]').first().attr('data-tab');
      }
   }*/

   changeTab(defaultTab);

   $tabs.on('click', '.switch', function () {
      if ($(this).hasClass('active')) return false;

      changeTab($(this).attr('data-tab'));

      return false;
   });


   function changeTab(tab) {
      $tabs.find('[data-tab]').removeClass('active');
      $tabs.find('[data-tab="' + tab + '"]').addClass('active');
   }
}

export {initTabs}

