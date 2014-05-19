'use strict';

angular.module('antagonista')
  .controller('MainCtrl', function ($scope, $location, $timeout) {
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

      $timeout(function() {
        $location.url('/n/' + node);
      }, 600);
    };
  });
