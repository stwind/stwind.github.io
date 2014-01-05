define([
  'backbone',
  './loading',
  './pages'
], function(Backbone, Loading, Pages) {

  return Backbone.View.extend({

    initialize: function() {
      var self = this,
          model = this.model;

      this.listenTo(model, 'change:page', function(model, page) {
        self.changePage(page);
      });

      var Page = Pages.get(model.getPage());
      var view = new Page({ model: model, el: this.$el.children() });

      this.setView(view);
    },

    changePage: function(page) {
      var self = this;

      var Page = Pages.get(page),
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
