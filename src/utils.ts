import type { Fn, IObjectOf } from "@thi.ng/api";
import { IAtom, defViewUnsafe } from "@thi.ng/atom";
import { isArray } from "@thi.ng/checks";
import type { EventBus } from "@thi.ng/interceptors";

import type { ViewSpec } from "./api";
import { EV } from "./config";

export const makeViews = (state: IAtom<any>, specs: IObjectOf<ViewSpec>) => {
  const views = {};
  for (let id in specs) {
    const spec = specs[id];
    views[id] = isArray(spec) ?
      defViewUnsafe(state, spec[0], <Fn<any, any>>spec[1]) :
      defViewUnsafe(state, spec);
  }
  return views;
};

export const routeTo = (bus: EventBus, id: PropertyKey, params: any) =>
  bus.dispatch([EV.ROUTE_TO, [id, params]]);