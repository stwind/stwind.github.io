'use strict';

angular
  .module('antagonista', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate'
  ])
  .provider('viewManager', function() {
    var current;

    this.resolve = {
      lastCtrl: function() {
        if (current) return current.hideCurrentNode();
      }
    };

    this.$get = function(){
      return {
        show: function(scope) {
          current = scope
        }
      };
    };
  })
  .config(
    ['$routeProvider','$interpolateProvider','viewManagerProvider',
      function ($routeProvider, $interpolateProvider, viewManagerProvider) {
        $routeProvider
        .when('/', {
          redirectTo: '/n/about'
        })
        .when('/n/:node', {
          templateUrl: function(p) {
            return 'n/' + p.node + '.html';
          },
          resolve: viewManagerProvider.resolve,
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

        $interpolateProvider.startSymbol('{%');
        $interpolateProvider.endSymbol('%}');
  }]);
