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
} from '@thi.ng/interceptors';
import { EVENT_ROUTE_CHANGED } from '@thi.ng/router';
import { dateTime } from '@thi.ng/date';

import type { Context, ViewSpec } from './api';
import { featuredItemList, itemFull } from './components';
import { routeTo, readJson } from './utils';

export enum ROUTES {
  HOME = 'home',
  ITEM = 'item',
  TAG = 'tag',
}

export const routes = [
  { id: ROUTES.HOME, title: 'Home page', match: ['home'] },
  { id: ROUTES.ITEM, title: 'Item', match: ['items', '?id'] },
];

export const ui = {
  link: {
    default: { class: 'cursor-pointer hover:underline' },
    external: { class: 'text-red' },
  },
  image: {
    default: { class: 'h-auto' },
    loading: { class: 'bg-gray-200' },
  },
  email: { class: 'text-green' },

  app: {
    class: `
    leading-snug
    relative font-thin subpixel-antialiased text-gray-700 fs--1
    px-4 max-w-4xl mx-auto`,
  },
  header: {
    class:
      'inset-x-0 sticky font-thin text-black top-0 py-5 mb-8 sm:mb-12 md:mb-20 z-10',
  },
  title: { class: 'fs-1 inline-block' },
  profile: { class: 'text-gray-600 fixed top-12 -z-1' },
  content: { class: 'w-full py-4' },

  nav: {
    button: {
      class: 'h-5 w-5 svg-icon absolute top-7 -right-0.5 cursor-pointer',
    },
    links: { class: 'mb-16' },
  },

  item: {
    list: { class: 'grid gap-8 grid-cols-1 sm:grid-cols-2' },
    thumb: {
      main: { class: 'relative font-thin' },
      cover: {
        class: 'h-52 md:h-60 bg-gray-300 cursor-pointer overflow-hidden mb-2',
      },
      image: { class: 'object-cover h-full w-full' },
      content: { class: '' },
      title: { class: 'fs-0 text-gray-600' },
      date: { class: 'fs--2' },
    },
    full: {
      main: { class: 'item-full relative' },
      header: { class: 'mb-4 sm:mb-6' },
      date: { class: 'fs--2' },
      title: {
        class: 'font-thin fs-2 sm:fs-3 sm:text-gray-600 leading-tight',
      },
      content: { class: 'bg-gray-98' },
      image: { class: 'bg-gray-300 w-full object-cover' },
    },
    slim: {
      main: { class: 'relative mb-6' },
      date: { class: 'absolute font-mono top-1' },
      body: { class: 'ml-14' },
      title: { class: 'fs-0 text-gray-600' },
    },
  },

  tag: {
    sign: { class: 'text-gray-400 fs--2' },
    normal: { class: 'text-gray-600' },
    highlight: { class: 'tag bg-black text-white' },
  },
};

export const initialState = {
  nav: { visible: false },
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
    } else routeTo(bus, ROUTES.HOME);
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
}

export enum FX {
  ROUTE_TO = 'route-to',
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
    readJson(res, data => bus.dispatch([EV.INITIALIZE, processData(data)])),
  [EV.FETCH_DATA_ERROR]: trace,
  [EV.INITIALIZE]: [
    valueSetter('items', (x: any) => x.items),
    valueSetter('tags', (x: any) => x.tags),
    valueSetter('featured', (x: any) => x.featured),
  ],
  [EVENT_ROUTE_CHANGED]: [
    trace,
    valueSetter('route'),
    dispatchNow([EV_SET_VALUE, ['nav.visible', false]]),
  ],
  [EV.ROUTE_TO]: (_, [__, route]: Event) => ({ [FX.ROUTE_TO]: route }),
};
