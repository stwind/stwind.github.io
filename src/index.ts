import { start } from '@thi.ng/hdom';
import { Atom } from '@thi.ng/atom';
import { EventBus } from '@thi.ng/interceptors';
import { HTMLRouter, EVENT_ROUTE_CHANGED, RouteMatch } from '@thi.ng/router';

import {
  routes,
  initialState,
  ui,
  events,
  effects,
  views,
  EV,
  FX,
  ROUTES,
} from './config';
import { root } from './components';
import { makeViews, routeTo } from './utils';
import type { State } from './api';

interface AppState {
  route: RouteMatch | undefined;
  state: State;
}

class App {
  _state: Atom<State>;
  bus: EventBus;
  router: HTMLRouter;
  private _stop: () => boolean = () => true;

  constructor() {
    this._state = new Atom(initialState);
    this.bus = new EventBus(this._state, events, effects);

    this.router = new HTMLRouter({
      useFragment: true,
      defaultRouteID: ROUTES.HOME,
      routes,
    });

    this.router.addListener(EVENT_ROUTE_CHANGED, e =>
      this.bus.dispatch([EVENT_ROUTE_CHANGED, e.value])
    );

    this.bus.addEffect(FX.ROUTE_TO, ([id, params]) =>
      this.router.routeTo(this.router.format(id, params))
    );
  }

  start() {
    this._stop = start(({ bus }) => (bus.processQueue() ? [root] : null), {
      ctx: {
        state: this._state,
        bus: this.bus,
        ui,
        views: makeViews(this._state, views),
      },
    });
    this.bus.dispatch([EV.FETCH_DATA]);
    this.router.start();
  }

  stop() {
    this._stop();
    this.router.release();
  }

  get state(): AppState {
    return {
      route: this.router.current,
      state: this._state.value,
    };
  }

  set state({ route, state }: AppState) {
    this._state.value = state;
    if (route) {
      const { id, params } = route;
      routeTo(this.bus, id, params);
    }
  }
}

export const app = new App();
app.start();

const hot = import.meta.hot;
if (hot) {
  hot.accept(({ module }) => {
    // @ts-ignore
    module.app.state = hot.state;
  });
  hot.dispose(() => {
    // @ts-ignore
    hot.state = app.state;
    app.stop();
  });
}
