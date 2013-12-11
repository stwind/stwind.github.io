define([
  './pages/about',
  './pages/code',
  './pages/posts',
  './pages/home',
  './pages/photos'
], function(About, Code, Posts, Home, Photos) {

  return {
    'about': About,
    'code': Code,
    'posts': Posts,
    'home': Home,
    'photos': Photos
  };

});
