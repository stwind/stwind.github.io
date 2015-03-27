'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, Redirect, Link } = Router;

var App = require('./app');
var address = require('./address');

var Address = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    var addr = address.get(this.context.router.getCurrentParams().addr);
    var Layout = require('./layout/' + addr.layout);

    return (
      <Layout {...addr} />
    );
  }
});

var routes = (
  <Route path="/" handler={App}>
    <Route name="address" path=":addr" handler={Address}/>
    <Redirect from="/" to="address" params={{ addr: '0x091de4f1' }}/>
  </Route>
);

module.exports = routes;
