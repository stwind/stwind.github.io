import 'normalize.css';

import React from 'react';
import Router, { Route, DefaultRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';

function main() {
  var routes = (
    <Route name="app" path="/" handler={App}>
      <DefaultRoute handler={Home}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
}

main();
