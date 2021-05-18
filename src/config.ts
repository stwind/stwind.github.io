import type { IObjectOf } from '@thi.ng/api';
import {
  valueSetter,
  Event,
  dispatchNow,
  EV_SET_VALUE,
  FX_DISPATCH_ASYNC,
  FX_FETCH,
  trace,
  EventDef,
  EffectDef,
  EV_TOGGLE_VALUE,
  forwardSideFx,
} from '@thi.ng/interceptors';
import { EVENT_ROUTE_CHANGED } from '@thi.ng/router';
import { dateTime } from '@thi.ng/date';

import type { Context, State, ViewSpec } from './api';
import { featuredItemList, itemFull } from './components';
import { routeTo, readJson } from './utils';

export enum ROUTES {
  HOME = 'home',
  ITEM = 'item',
}

export const routes = [
  { id: ROUTES.HOME, title: 'Home', match: ['home'] },
  { id: ROUTES.ITEM, title: 'Item', match: ['items', '?id'] },
];

export const ui = {
  link: {
    default: { class: 'cursor-pointer hover:underline' },
    external: { class: 'text-red' },
  },
  image: {
    main: { class: 'bg-gray-200 relative' },
    content: { class: 'object-cover absolute w-full h-full inset-0 hidden' },
  },
  email: { class: 'text-green' },

  app: {
    class: `
    leading-snug
    relative font-light subpixel-antialiased text-black fs--1
    px-4 max-w-4xl mx-auto`,
  },
  header: {
    class:
      'inset-x-0 sticky font-thin text-black top-0 py-5 mb-8 sm:mb-12 md:mb-20 z-10',
  },
  title: { class: 'fs-1 inline-block leading-none' },
  profile: { class: 'text-gray-600 fixed top-12 -z-1' },
  content: { class: 'w-full py-4 relative' },

  nav: {
    main: { class: '' },
    toggle: {
      class: 'h-5 w-5 svg-icon absolute top-7 -right-0.5 cursor-pointer',
    },
    links: { class: 'sticky top-0 mb-12' },
    content: { class: 'bg-gray-96' },
  },

  item: {
    list: { class: 'grid gap-8 grid-cols-1 sm:grid-cols-2' },
    thumb: {
      main: { class: 'relative' },
      cover: {
        class: 'h-52 md:h-60 bg-gray-200 cursor-pointer overflow-hidden mb-2',
      },
      image: { class: 'h-full w-full object-cover' },
      content: { class: '' },
      title: { class: 'fs-0 text-gray-600' },
      date: { class: 'fs--2' },
    },
    full: {
      main: { class: 'item-full relative' },
      header: { class: 'mb-4 sm:mb-6 -z-1 sticky top-0' },
      date: { class: 'fs--2' },
      title: {
        class:
          'font-thin fs-2 sm:fs-3 text-gray-600 sm:text-gray-600 leading-tight',
      },
      tags: { class: '' },
      content: { class: 'bg-gray-96' },
      image: { class: 'w-full' },
    },
    slim: {
      main: { class: 'relative mb-6' },
      date: { class: 'absolute font-mono top-1' },
      body: { class: 'ml-14' },
      title: { class: 'fs-0 text-gray-600' },
    },
  },

  tag: {
    sign: { class: 'text-gray-500 fs--2' },
    normal: { class: 'text-gray-600' },
    highlight: { class: 'tag bg-black text-white' },
  },
};

export const initialState: State = {
  nav: { visible: false },
  items: [],
  tags: [],
};

const components = {
  [ROUTES.HOME]: (ctx: Context) => [
    featuredItemList,
    ctx.views.featured.deref() || [],
  ],
  [ROUTES.ITEM]: ({ views, bus }: Context) => {
    const route = views.route.deref();
    const items = views.items.deref();
    if (!!items) {
      const item = items.find(item => item.id == route.params.id);
      if (item) return [itemFull, item];
      else routeTo(bus, ROUTES.HOME);
    }
  },
};

export const views: IObjectOf<ViewSpec> = {
  nav: 'nav',
  items: 'items',
  tags: 'tags',
  featured: 'featured',

  route: 'route',
  content: ['route.id', id => components[id]],
};

export enum EV {
  ROUTE_TO = 'route-to',
  FETCH_DATA = 'fetch-data',
  FETCH_DATA_DONE = 'fetch-data-done',
  FETCH_DATA_ERROR = 'fetch-data-error',
  INITIALIZE = 'initialize',
  TOGGLE_NAV = 'toggle-nav',
}

export enum FX {
  ROUTE_TO = 'route-to',
  ROUTER_START = 'router-start',
  SCROLL_TOP = 'scroll-top',
}

export const processData = data => {
  const tags = Object.fromEntries(data.tags.map(tag => [tag.id, tag]));
  const items = data.items.map(item => ({
    ...item,
    date: dateTime(Date.parse(item.date)),
    tags: item.tags.map(x => tags[x]),
  }));
  const featured = data.featured.map(id => items.find(x => x.id == id));
  return { items, tags, featured };
};

export const events: IObjectOf<EventDef> = {
  [EV.FETCH_DATA]: () => ({
    [FX_DISPATCH_ASYNC]: [
      FX_FETCH,
      '/data.json',
      EV.FETCH_DATA_DONE,
      EV.FETCH_DATA_ERROR,
    ],
  }),
  [EV.FETCH_DATA_DONE]: (_, [__, res], bus) =>
    readJson(res).then(data =>
      bus.dispatch([EV.INITIALIZE, processData(data)])
    ),
  [EV.FETCH_DATA_ERROR]: trace,
  [EV.INITIALIZE]: [
    valueSetter('items', (x: any) => x.items),
    valueSetter('tags', (x: any) => x.tags),
    valueSetter('featured', (x: any) => x.featured),
    forwardSideFx(FX.ROUTER_START),
  ],
  [EV.TOGGLE_NAV]: [
    dispatchNow([EV_TOGGLE_VALUE, 'nav.visible']),
    forwardSideFx(FX.SCROLL_TOP),
  ],
  [EVENT_ROUTE_CHANGED]: [
    valueSetter('route'),
    dispatchNow([EV_SET_VALUE, ['nav.visible', false]]),
    forwardSideFx(FX.SCROLL_TOP),
  ],
  [EV.ROUTE_TO]: (_, [__, route]: Event) => ({ [FX.ROUTE_TO]: route }),
};

export const effects: IObjectOf<EffectDef> = {
  [FX.SCROLL_TOP]: () => window.scrollTo(0, 0),
};
