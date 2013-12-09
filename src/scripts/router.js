define([
  'backbone'
], function(Backbone) {

  return Backbone.Router.extend({

    initialize: function(opts) {
      Backbone.history.start(opts);
    },

    routes: {
      '': 'index'
    },

    index: function() {
      console.log('index');
    }

  });

});
