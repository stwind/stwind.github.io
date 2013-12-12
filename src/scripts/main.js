require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    'backbone.layoutmanager': '../bower_components/layoutmanager/backbone.layoutmanager',
    underscore: '../bower_components/underscore/underscore',
    log: '../bower_components/loglevel/dist/loglevel',
    handlebars: '../bower_components/handlebars/handlebars.runtime'
  },
  shim: {
    underscore: { exports: '_' },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: { exports: 'Handlebars' }
  },
  deps: ['lib/backbone.layout', 'lib/backbone.page']
});

require(['app'], function (App) {
    'use strict';

    window.app = App.start({
      mainEl: '#main',
      logLevel: 'debug'
    });
});
