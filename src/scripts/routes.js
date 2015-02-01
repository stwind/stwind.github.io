'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, Redirect, Link } = Router;

var App = require('./app');
var Post = require('./post');

var addresses = {
  '0x00000000': { layout: Post, props: {
      id: 'about' 
    }
  }
};

var Address = React.createClass({
  mixins: [Router.State],

  _getProps: function () {
    var params = this.getParams();
    return addresses[params.addr];
  },

  render: function () {
    var addr = this._getProps();
    return (
      <addr.layout {...addr.props} />
    );
  }
});

var routes = (
  <Route path="/" handler={App}>
    <Route name="address" path=":addr" handler={Address}/>
    <Redirect from="/" to="address" params={{addr: '0x00000000'}} />
  </Route>
);

module.exports = routes;
