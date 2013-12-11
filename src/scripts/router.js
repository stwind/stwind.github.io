define([
  'backbone'
], function(Backbone) {

  var pageUrl = function(page) {
    var section = page.section,
        parts = ['', section];

    if (section == 'photos') {
      if (page.album) {
        parts.push(page.album);
        page.photo && parts.push(page.photo);
      }
    }

    return parts.join('/');
  };

  return Backbone.Router.extend({

    initialize: function(opts) {
      var model = this.model = opts.model;
      var self = this;

      Backbone.history.start(opts);

      this.listenTo(model, 'change:page', function(model, page) {
        self.navigate(pageUrl(page));
      });
    },

    routes: {
      '': 'home',
      'photos(/)': 'photos',
      //'photos/:album(/)': 'alubm',
      //'photos/:album/:photo(/)': 'photo',
      'code(/)': 'code',
      'posts(/)': 'posts',
      'about(/)': 'about'
    },

    home: function() {
      this.model.setPage({ section: 'home' });
      console.log('route home');
    },

    photos: function() {
      this.model.setPage({ section: 'photos' });
      console.log('route photos');
    },

    album: function(album) {
      this.model.setPage({ section: 'photos', album: album });
      console.log('route album', album);
    },

    photo: function(album, photo) {
      this.model.setPage({
        section: 'photos',
        album: album, photo: photo
      });
      console.log('route album', album, 'photo', photo);
    },

    code: function() {
      this.model.setPage({ section: 'code' });
      console.log('route code');
    },

    posts: function() {
      this.model.setPage({ section: 'posts' });
      console.log('route posts');
    },

    about: function() {
      this.model.setPage({ section: 'about' });
      console.log('route about');
    }

  });

});
