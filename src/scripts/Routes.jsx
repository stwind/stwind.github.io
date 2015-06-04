import dbg from 'debug';
import React from 'react';
import { Route, Redirect, DefaultRoute } from 'react-router';

import App from './app';
import PD from './components/PD.jsx';

let debug = dbg('app:routes');

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={PD} />
  </Route>
);

export default routes;
