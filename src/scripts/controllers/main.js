'use strict';

angular.module('antagonista')
  .controller('MainCtrl', ['$scope','$location','$timeout','viewManager', function ($scope, $location, $timeout, viewManager) {
    viewManager.show($scope);

    $scope.titleClass = 'blink';

    $scope.showCurrentNode = function(){
      $timeout(function() {
        $scope.titleClass = 'typein';

        $timeout(function(){ $scope.showTime = true; }, 900);
        $timeout(function(){ $scope.showContent = true; }, 1100);
        $timeout(function(){ $scope.showNexts = true; }, 1300);
      }, 700);
    };

    $scope.hideCurrentNode = function(node) {
      $scope.titleClass = 'blink';

      $scope.showContent = false;
      $scope.showTime = false; 
      $scope.showNexts = false; 

      return $timeout(function() {
        if (node) $location.url('/n/' + node);
      }, 300);
    };
  }]);
