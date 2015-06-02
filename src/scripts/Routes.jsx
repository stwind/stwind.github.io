import dbg from 'debug';
import React from 'react';
import { Route, Redirect, State } from 'react-router';

import App from './app';
import address from './address';
import PD from './components/PD.jsx';

let debug = dbg('app:routes');

var routes = (
  <Route path="/" handler={App}>
    <Route name="pd" path="pd" handler={PD}/>
    <Redirect from="/" to="pd" />
  </Route>
);

export default routes;
