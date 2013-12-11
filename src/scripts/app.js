define([
  'router',
  'models/main',
  'views/main'
], function (Router, Model, View) {
  'use strict';

  return { 
    start: function(opts) {
      var app = {};

      var model = app.model = new Model();
      app.router = new Router({ model: model, pushState: true });
      app.view = new View({ model: model, el: opts.mainEl });

      return app;
    }
  };
});
