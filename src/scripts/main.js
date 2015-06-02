require('normalize.css/normalize.css');
require('styles/app.scss');

const debug = require('debug');
const React = require('react');
const Router = require('react-router');

debug.enable('app:*');

const routes = require('./routes');

React.initializeTouchEvents(true);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});
