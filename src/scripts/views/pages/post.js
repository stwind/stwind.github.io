define([
  'backbone',
  'jquery'
], function(Backbone, $) {

  return Backbone.Page.extend({

    initialize: function() {
      var post = this.model.getPage().post;
      this.template = 'blog/' + post;
    },

    events: {
      'click .post-title': '_clicked'
    },

    _clicked: function(e) {
      e.preventDefault();
    }

  });

});
