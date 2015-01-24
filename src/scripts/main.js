'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var App = require('./app');
var NodeElm = require('./node');

var routes = (
  <Route path="/" handler={App}>
    <Route name="node" path="n/:nodeid" handler={NodeElm}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
