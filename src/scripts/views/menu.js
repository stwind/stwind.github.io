define([
  'backbone',
  'underscore',
  './menu-item'
], function(Backbone, _, Item) {

  return Backbone.View.extend({

    initialize: function() {
      var self = this,
          model = this.model;

      this.$('a').each(function(idx, $el) {
        var item = new Item({ el: $el, model: model });
        self.insertView(item);
      });
    }

  });

});
