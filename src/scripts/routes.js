import dbg from 'debug';
import React from 'react';
import { Route, DefaultRoute, Redirect, Link } from 'react-router';

import App from './app';
import address from './address';

let debug = dbg('app:routes');

var Address = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    var addr = address(this.context.router.getCurrentParams().addr);
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

export default routes;
