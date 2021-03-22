import type { Fn, IObjectOf } from "@thi.ng/api";
import { IAtom, defViewUnsafe } from "@thi.ng/atom";
import { isArray } from "@thi.ng/checks";

import type { ViewSpec } from "./api";

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