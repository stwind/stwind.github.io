import dbg from 'debug';
import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/web';

import Model from './model';
import { initial as initialModel } from './model';
import View from './view';
import Intent from './intent';
import Background from './components/backgrond';

require('normalize.css/normalize.css');
// require('styles/app.css');

dbg.enable('app:*');

var debug = dbg('app:main');

var computer = function (interactions) {
  const userIntent = Intent(interactions);
  const model = Model(userIntent, initialModel());
  const vtree$ = View(model);

  return { dom: vtree$ };
};

Cycle.run(computer, {
  dom: makeDOMDriver('#app', {
    'background': Background
  })
});
