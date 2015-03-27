'use strict';

require('normalize.css/normalize.css');
require('styles/app.scss');

var debug = require('debug');
var React = require('react');
var Router = require('react-router');

debug.enable('app:*');

document.body.addEventListener('touchmove',function(event){
  event.preventDefault();
});

var routes = require('./routes');

React.initializeTouchEvents(true);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});
