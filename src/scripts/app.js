'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var App = React.createClass({
  mixins: [Router.State],

  render: function () {
    return (
      <div>
        <h1>hello</h1>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
