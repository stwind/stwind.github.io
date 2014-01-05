define([
  'backbone',
  'jquery'
], function(Backbone, $) {

  return Backbone.Page.extend({

    template: 'blog',

    events: {
      'click .post-title': '_clicked'
    },

    _clicked: function(e) {
      e.preventDefault();
      var el = $(e.currentTarget);
      this.model.setPage({ section: 'blog', post: el.data('name') });
    }

  });

});
