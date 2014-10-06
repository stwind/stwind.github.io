'use strict';

angular
  .module('antagonista', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $interpolateProvider){
    $urlRouterProvider.otherwise('/n/about');

    $stateProvider
      .state('node', {
        url: '/n/:node',
        templateUrl: function ($stateParams){
          return 'n/' + $stateParams.node + '.html';
        }
      });

    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
  });
