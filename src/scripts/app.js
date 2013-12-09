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
      app.view = new View({ model: model, el: opts.mainEl });
      app.router = new Router({ model: model });

      return app;
    }
  };
});
