'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, Redirect, Link } = Router;

var App = require('./app');
var address = require('./address');

var About = require('./layout/about');

var Address = React.createClass({
  mixins: [Router.State],

  render: function () {
    var addr = address.get(this.getParams().addr);
    var Layout = require('./layout/' + addr.layout);

    return (
      <Layout {...addr} />
    );
  }
});

var routes = (
  <Route path="/" handler={App}>
    <Route name="address" path=":addr" handler={Address}/>
    <DefaultRoute handler={About}/>
  </Route>
);

module.exports = routes;
