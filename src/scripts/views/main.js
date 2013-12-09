define([
  'backbone',
  './logo',
  './menu'
], function(Backbone, Logo, Menu) {

  return Backbone.View.extend({

    initialize: function() {
      var model = this.model;

      this.setViews({
        '.logo': new Logo({ model: model, el: this.$('.logo') }),
        '.menu': new Menu({ model: model, el: this.$('.menu') })
      });
    }

  });

});
