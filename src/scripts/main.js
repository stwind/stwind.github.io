'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, Redirect, Link } = Router;

var App = require('./app');
var Post = require('./post');

var routes = (
  <Route path="/" handler={App}>
    <Route name="node" path="p/:id" handler={Post}/>
    <Redirect from="/" to="node" params={{id: 'about'}} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
