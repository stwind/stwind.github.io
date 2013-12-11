define([
  'backbone',
  './logo',
  './menu',
  './content'
], function(Backbone, Logo, Menu, Content) {

  return Backbone.View.extend({

    initialize: function() {
      var model = this.model; 

      this.setViews({
        '.logo': new Logo({ model: model, el: this.$('.logo') }),
        '.menu': new Menu({ model: model, el: this.$('.menu') }),
        '.content': new Content({ model: model, el: this.$('.content') })
      });
    }

  });

});
