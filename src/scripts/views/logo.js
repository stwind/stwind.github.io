define([
  'backbone'
], function(Backbone) {

  return Backbone.View.extend({

    events: {
      'click a': '_clicked'
    },

    _clicked: function(e) {
      e.preventDefault();
      this.model.setPage({ section: 'home' });
    }

  });

});
