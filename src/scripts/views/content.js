define([
  'backbone',
  './loading',
  './pages'
], function(Backbone, Loading, Pages) {

  var viewOf = function(page) {
    if (page.photo) return 'photo';
    else if (page.album) return 'album';
    else return page.section;
  };

  return Backbone.View.extend({

    initialize: function() {
      var self = this,
          model = this.model;

      this.listenTo(model, 'change:page', function(model, page) {
        self.changePage(page);
      });

      var Page = Pages[viewOf(model.getPage())];
      var view = new Page({ model: model, el: this.$el.children() });

      this.setView(view);
    },

    changePage: function(page) {
      var self = this;

      var Page = Pages[viewOf(page)],
          view = new Page({ model: this.model });

      self.loading();

      view.render().promise().then(function() {
        self.setView(view);
      });

      return this;
    },

    loading: function() {
      var loading = new Loading({ model: this.model });

      this.setView(loading).render();

      return this;
    }

  });

});
