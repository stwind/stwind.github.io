'use strict';

angular
  .module('antagonista', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider, $interpolateProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/n/home'
      })
      .when('/n/:node', {
        template: function(p) {
          var defer = $.Deferred();

          $.ajax('n/' + p.node, {
            success: function(data) {
              var main = $(data).filter('#main');
              defer.resolve(main.html());
            }
          });
          return defer.promise();
        },
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    $interpolateProvider.startSymbol('{%');
    $interpolateProvider.endSymbol('%}');
  });
