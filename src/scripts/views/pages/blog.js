define([
  'backbone',
  'jquery'
], function(Backbone, $) {

  return Backbone.Page.extend({

    template: 'blog',

    events: {
      'click .post-title a,.post-continue': '_clicked'
    },

    _clicked: function(e) {
      e.preventDefault();
      var el = $(e.currentTarget),
          post = el.attr('href'),
          result = post.match('(.*)#([^?]*)'),
          page;

      if (result) {
        page = { section: 'blog', post: result[1], id: result[2] };
      } else {
        page = { section: 'blog', post: post };
      }

      this.model.setPage(page);
    }

  });

});
