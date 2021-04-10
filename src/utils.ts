import type { Fn, IObjectOf } from '@thi.ng/api';
import { IAtom, defViewUnsafe } from '@thi.ng/atom';
import { isArray } from '@thi.ng/checks';
import { EventBus, EV_SET_VALUE } from '@thi.ng/interceptors';
import { defFormat } from '@thi.ng/date';

import type { ViewSpec } from './api';
import { EV } from './config';

export const makeViews = (state: IAtom<any>, specs: IObjectOf<ViewSpec>) => {
  const views = {};
  for (let id in specs) {
    const spec = specs[id];
    views[id] = isArray(spec)
      ? defViewUnsafe(state, spec[0], <Fn<any, any>>spec[1])
      : defViewUnsafe(state, spec);
  }
  return views;
};

export const routeTo = (bus: EventBus, id: PropertyKey, params?) => {
  bus.dispatch([EV_SET_VALUE, ['nav.visible', false]]);
  bus.dispatch([EV.ROUTE_TO, [id, params]]);
};

export const fmtDate = defFormat(['yyyy', '.', 'MM']);

export const readJson = (res: Response) => {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let data = '';
  return new Promise(resolve => {
    reader.read().then(function process({ done, value }) {
      if (done) {
        resolve(JSON.parse(data.replace(/(?:\r\n|\r|\n)/g, '')));
      } else {
        data += decoder.decode(value);
        return reader.read().then(process);
      }
    });
  });
};
