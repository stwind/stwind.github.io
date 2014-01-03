define([
  'backbone',
  'jquery',
  'backbone.layoutmanager'
], function(Backbone, $) {

  Backbone.Page = Backbone.View.extend({

    fetchTemplate: function(template) {
      var done = this.async();

      return $.ajax('/' + template, { 
        success: function(data) {
          done($(data).find('.content').html());
        }
      });
    },

    renderTemplate: function(template) {
      return template;
    },

    noel: true

  });

});
