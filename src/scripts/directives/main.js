'use strict';

angular.module('antagonista')
  .directive('agTyping', ['$animate','$timeout',function ($animate, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        elem.data('text', elem.html()).html('_');
        scope.showCurrentNode();
      }
    };
  }]);
