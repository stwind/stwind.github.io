'use strict';

angular
  .module('antagonista', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate'
  ])
  .config(function ($routeProvider, $interpolateProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/n/home'
      })
      .when('/n/:node', {
        templateUrl: function(p) {
          return 'n/' + p.node + '.html';
        },
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
  });
