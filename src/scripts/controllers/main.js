'use strict';

angular.module('antagonista')
  .controller('NodeCtrl', function ($scope, $state, $timeout){

    $scope.toNext = function (node){
      $scope.hidden = true;

      $timeout(function() {
        if (node) $state.go('node', {node: node});
      }, 300);
    };
  });
