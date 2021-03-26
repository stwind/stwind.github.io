import { start } from '@thi.ng/hdom';
import { Atom } from '@thi.ng/atom';
import { EventBus } from '@thi.ng/interceptors';
import { HTMLRouter, EVENT_ROUTE_CHANGED } from '@thi.ng/router';

import { routes, initialState, ui, events, views, FX } from './config';
import { app } from './components';
import { makeViews, routeTo } from './utils';

const state = new Atom(initialState);
const bus = new EventBus(state, events);

const router = new HTMLRouter({
  useFragment: true,
  defaultRouteID: 'home',
  initialRouteID: 'home',
  separator: '/',
  prefix: '/',
  routes,
});

// router.addListener(EVENT_ROUTE_CHANGED, console.log);
router.addListener(EVENT_ROUTE_CHANGED, e =>
  bus.dispatch([EVENT_ROUTE_CHANGED, e.value])
);

bus.addEffect(FX.ROUTE_TO, ([id, params]) =>
  router.routeTo(router.format(id, params))
);

const stop = start(({ bus }) => (bus.processQueue() ? app : null), {
  ctx: { state, bus, ui, views: makeViews(state, views) },
});

router.start();

export function refresh(route) {
  const { id, params } = route;
  routeTo(bus, id, params);
}

const hot = import.meta.hot;
if (hot) {
  hot.accept(({ module }) => {
    // @ts-ignore
    module.refresh(hot.current);
  });
  hot.dispose(() => {
    // @ts-ignore
    hot.current = router.current;

    stop();
    router.release();
  });
}
