'use strict';

angular.module('antagonista')
  .controller('MainCtrl', function ($scope, $routeParams, $timeout) {

    $scope.showContent = function(){
      $scope.stateTime = true;
      $timeout(function(){ $scope.stateContent = true; }, 300)
    };
  });
