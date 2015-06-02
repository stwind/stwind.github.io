require('normalize.css/normalize.css');
require('styles/app.scss');

import debug from 'debug';
import React from 'react';
import Router from 'react-router';

debug.enable('app:*');

import routes from './routes';

React.initializeTouchEvents(true);

Router.run(routes,  Handler => {
  React.render(<Handler/>, document.getElementById('main'));
});
