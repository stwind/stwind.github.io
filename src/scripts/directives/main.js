'use strict';

angular.module('antagonista')
  .directive('agTyping', function ($animate, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var text = elem.html();
        elem.html('_').data('text', text);
        $timeout(function(){
          $animate.removeClass(elem, 'blink');
          $animate.addClass(elem, 'typein', function(){
            $timeout(function() { scope.showContent(); }, 300);
          });
        }, 1000);

        elem.on('click', function() {
          $animate.removeClass(elem, 'typein');
        });
      }
    };
  });
