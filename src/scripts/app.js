define([
  'router',
  'models/main',
  'views/main',
  'log'
], function (Router, Model, View, Log) {
  'use strict';

  return { 
    start: function(opts) {
      Log.setLevel(opts.logLevel);

      var app = {};

      var model = app.model = new Model();
      app.router = new Router({ model: model, pushState: true });
      app.view = new View({ model: model, el: opts.mainEl });

      return app;
    }
  };
});
