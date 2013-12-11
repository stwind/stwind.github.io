define([
  'backbone'
], function(Backbone) {

  var compare = {
    'photos': function(p1, p2) {
      return p1.album == p2.album && p1.photo == p2.photo;
    },
    'default': function(p1, p2) {
      return true;
    }
  };

  var isSamePage = function(p1, p2){
    if (p1.section == p2.section) {
      return (compare[p1.section] || compare['default'])(p1, p2);
    } else {
      return false;
    }
  };

  return Backbone.Model.extend({

    setPage: function(page) {
      var current = this.getPage();

      if (!isSamePage(page, current)) {
        this.set('page', page);
      }

      return this;
    },

    getPage: function(page) {
      return this.get('page') || { section: 'home' };
    }

  });

});
