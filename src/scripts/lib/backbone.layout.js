define([
  'backbone',
  'templates',
  'backbone.layoutmanager'
], function(Backbone, JST) {

  Backbone.Layout.configure({
    manage: true,

    fetchTemplate: function(tmpl) {
      return JST[tmpl];
    }
  });

});
