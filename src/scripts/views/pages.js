define([
  './pages/about',
  './pages/code',
  './pages/blog',
  './pages/home',
  './pages/photos',
  './pages/post'
], function(About, Code, Blog, Home, Photos, Post) {

  var views = {
    photos: function(page) {
      return Photos;
    },
    blog: function(page) {
      if (page.post) return Post;
      else return Blog;
    },
    about: function(page) {
      return About;
    },
    code: function(page) {
      return Code;
    },
    home: function(page) {
      return Home;
    }
  }

  return {
    get: function(page) {
      return (views[page.section])(page);
    }
  };

});
