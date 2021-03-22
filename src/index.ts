import type { Fn } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { start } from "@thi.ng/hdom";
import { Atom, defViewUnsafe } from "@thi.ng/atom";
import { EventBus, valueUpdater, dispatchNow, valueSetter } from "@thi.ng/interceptors";
import { HTMLRouter, EVENT_ROUTE_CHANGED } from "@thi.ng/router";

import { app } from "./components";

const state = new Atom({});

const specs = {
  route: "route"
};
const views = {};
for (let id in specs) {
  const spec = specs[id];
  views[id] = isArray(spec) ?
    defViewUnsafe(state, spec[0], <Fn<any, any>>spec[1]) :
    defViewUnsafe(state, spec);
}

const events = {
  // "init": () => ({
  //     [FX_STATE]: { clicks: 0, color: "grey" }
  // }),
  "inc-counter": [
      valueUpdater("clicks", (x: number) => x + 1),
      dispatchNow(["randomize-color"])
  ],
};
const bus = new EventBus(state, events);

const router = new HTMLRouter({
  useFragment: true,
  defaultRouteID: "home",
  initialRouteID: "home",
  separator: "/",
  prefix: "/",
  routes: [
    {
      id: "home",
      title: "Home page",
      match: ["home"]
    },
    {
      id: "item",
      title: "Item",
      match: ["items", "?id"],
    },
    {
      id: "tag",
      title: "Tag",
      match: ["tags", "?id"],
    },
  ]
});

router.addListener(EVENT_ROUTE_CHANGED, console.log);
router.addListener(EVENT_ROUTE_CHANGED, e => bus.dispatch([EVENT_ROUTE_CHANGED, e.value]));

bus.addHandlers({
    [EVENT_ROUTE_CHANGED]: valueSetter("route"),
    // [ev.ROUTE_TO]: (_, [__, route]) => ({ [fx.ROUTE_TO]: route }),
});
        // this.ctx.bus.addEffect(fx.ROUTE_TO, ([id, params]) =>
        //     this.router.routeTo(this.router.format(id, params))
        // );

start(
  ({ bus }) => bus.processQueue() ? app : null,
  { ctx: { state, bus, views } }
);

router.start();