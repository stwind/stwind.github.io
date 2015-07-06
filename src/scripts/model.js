import dbg from 'debug';
import { Rx } from '@cycle/core';
import { fromJS, Map } from 'immutable';

var debug = dbg('app:model');

export function initial () {
  var space = fromJS({});
  return { space };
}

function applyMods(mods$, model) {
  return mods$.merge(Rx.Observable.just(model))
              .scan((acc, mod) => mod(acc))
              .shareReplay(1);
}

export default function Model(user, { space }) {

  // space modifications
  var spaceMods$ = Rx.Observable.empty();
  var space$ = applyMods(spaceMods$, space);

  return { space$ };
}
