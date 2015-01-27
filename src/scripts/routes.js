'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, Redirect, Link } = Router;

var App = require('./app');
var Post = require('./post');

var routes = (
  <Route path="/" handler={App}>
    <Route name="post" path="p/:id" handler={Post}/>
    <Redirect from="/" to="post" params={{id: 'about'}} />
  </Route>
);

module.exports = routes;
