'use strict';

angular.module('antagonista')
  .controller('NodeCtrl', function ($scope, $location, $timeout, viewManager){
    viewManager.show($scope);

    $scope.status = {
      waiting: true
    };

    $scope.showCurrentNode = function(){
      $timeout(function() {
        $scope.status.shown = true;
        $scope.status.waiting = false;

        $timeout(function(){ $scope.showTime = true; }, 900);
        $timeout(function(){ $scope.showContent = true; }, 1100);
        $timeout(function(){ $scope.showNexts = true }, 1300);
      }, 700);
    };

    $scope.hideCurrentNode = function(node) {
      $scope.status.waiting = true;
      $scope.status.shown = false;

      $scope.showContent = false;
      $scope.showTime = false; 
      $scope.showNexts = false; 

      return $timeout(function() {
        if (node) $location.url('/n/' + node);
      }, 300);
    };
  });
