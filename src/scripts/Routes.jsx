import dbg from 'debug';
import React from 'react';
import { Route, Redirect, DefaultRoute } from 'react-router';

import App from './app';
import Home from './components/Home.jsx';

let debug = dbg('app:routes');

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Home} />
  </Route>
);

export default routes;
