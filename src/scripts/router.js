define([
  'backbone',
  'log'
], function(Backbone, Log) {

  var pageUrl = function(page) {
    var section = page.section,
        parts = ['', section],
        hash;

    if (section == 'home')  parts.pop(); 

    if (section == 'photos') {
      if (page.album) {
        parts.push(page.album);
        page.photo && parts.push(page.photo);
      }
    }

    if (section == 'blog') {
      page.post && parts.push(page.post);
      page.id && (hash = page.id);
    }

    return parts.join('/') + (hash ? '#' + hash : '');
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
      'blog(/)': 'blog',
      'blog/:post(/)': 'post',
      'about(/)': 'about'
    },

    home: function() {
      this.model.setPage({ section: 'home' });
      Log.debug('route home');
    },

    photos: function() {
      this.model.setPage({ section: 'photos' });
      Log.debug('route photos');
    },

    album: function(album) {
      this.model.setPage({ section: 'photos', album: album });
      Log.debug('route album', album);
    },

    photo: function(album, photo) {
      this.model.setPage({
        section: 'photos',
        album: album, photo: photo
      });
      Log.debug('route album', album, 'photo', photo);
    },

    code: function() {
      this.model.setPage({ section: 'code' });
      Log.debug('route code');
    },

    blog: function() {
      this.model.setPage({ section: 'blog' });
      Log.debug('route blog');
    },

    post: function(post) {
      this.model.setPage({ section: 'blog', post: post });
      Log.debug('route blog post', post);
    },

    about: function() {
      this.model.setPage({ section: 'about' });
      Log.debug('route about');
    }

  });

});
