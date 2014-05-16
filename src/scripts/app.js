'use strict';

angular
  .module('antagonista', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/n/home'
      })
      .when('/n/:node', {
        template: function(p) {
          var defer = $.Deferred();

          $.ajax('n/' + p.node, {
            success: function(data) {
              var content = $(data).filter('#main').html();
              defer.resolve(content);
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
  });
