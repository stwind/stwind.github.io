'use strict';

angular.module('antagonista')
  .directive('agNode', function ($timeout, $animate){
    return {
      restrict: 'A',
      controller: 'NodeCtrl',
      link: function (scope, $el, attrs){
        var $title = $el.find('.node-title'),
            $time = $el.find('.node-time'),
            $content = $el.find('.node-content'),
            $nexts = $el.find('.nodes-next');

        $title.data('text', $title.html()).html('_');

        $timeout(function (){ 
          $animate.addClass($title, 'typein'); 
          $animate.removeClass($title, 'blink'); 
        }, 900);
        $timeout(function (){ $time.show(); }, 1200);
        $timeout(function (){ $content.show(); }, 1400);
        $timeout(function (){ $nexts.show(); }, 1600);

        scope.$watch('hidden', function (){
          $animate.removeClass($title, 'typein'); 
          $animate.addClass($title, 'blink'); 

          $time.hide();
          $content.hide();
          $nexts.hide();
        });
      }
    }
  });
