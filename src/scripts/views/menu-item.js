define([
  'backbone'
], function(Backbone) {

  return Backbone.View.extend({

    initialize: function(opts) {
      var href = this.$el.attr('href');
      this.section = href.substr(1, href.length - 1);

      this.listenTo(this.model, 'change:page', this._pageChanged);
    },

    events: {
      'click': '_clicked'
    },

    _clicked: function(e) {
      e.preventDefault();
      this.model.setPage({ section: this.section });
    },

    _pageChanged: function() {
      if (this.model.getPage().section == this.section) {
        this.$el.addClass('active');
      } else {
        this.$el.removeClass('active');
      }
    }

  });

});
