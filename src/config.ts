import type { IObjectOf } from '@thi.ng/api';
import {
  valueSetter,
  Event,
  dispatchNow,
  EV_SET_VALUE,
} from '@thi.ng/interceptors';
import { EVENT_ROUTE_CHANGED } from '@thi.ng/router';

import type { Context, ViewSpec } from './api';
import { itemList, itemFull } from './components';
import { routeTo } from './utils';
import data from './data.json';

export enum ROUTES {
  HOME = 'home',
  ITEM = 'item',
  TAG = 'tag',
}

export const routes = [
  { id: ROUTES.HOME, title: 'Home page', match: ['home'] },
  { id: ROUTES.ITEM, title: 'Item', match: ['items', '?id'] },
  { id: ROUTES.TAG, title: 'Tag', match: ['tags', '?id'] },
];

export const ui = {
  link: {
    default: { class: 'text-red sm:hover:text-white sm:hover:bg-red' },
    active: { class: 'bg-red text-white' },
  },
  image: {
    default: { class: '' },
    loading: { class: 'bg-gray-200' },
  },

  app: {
    class:
      'leading-snug relative font-light subpixel-antialiased text-gray-700 fs--1',
  },
  header: { class: 'p-4 inset-x-0 fixed z-10 font-thin text-black' },
  title: { class: 'fs-1 inline-block' },
  profile: { class: 'fs--1 text-gray-600 fixed left-4 top-11 font-thin' },
  content: { class: 'absolute w-full px-4 mt-20 z-0' },

  nav: {
    button: { class: 'h-5 w-5 svg-icon absolute top-6 right-3.5' },
  },

  item: {
    thumb: {
      main: { class: 'h-48 mb-4 p-1 relative font-thin' },
      cover: {
        class: 'absolute inset-0 bg-gray-300 cursor-pointer overflow-hidden',
      },
      image: { class: 'object-cover h-full w-full' },
      content: { class: 'absolute' },
      title: { class: 'text-block bg-white text-black fs-0 mb-1' },
    },
    full: {
      main: { class: 'item-full' },
      header: { class: 'mb-4' },
      title: { class: 'font-thin fs-2 leading-tight' },
      content: { class: 'bg-gray-98' },
      image: { class: 'bg-gray-300 w-full object-cover' },
    },
  },

  tag: {
    normal: { class: 'tag bg-white text-black' },
    highlight: { class: 'tag bg-black text-white' },
  },
};

const processData = data => {
  const tags = Object.fromEntries(data.tags.map(tag => [tag.id, tag]));
  const items = data.items.map(item => ({
    ...item,
    tags: item.tags.map(x => tags[x]),
  }));
  return { items, tags };
};

export const initialState = {
  nav: { visible: false },
  ...processData(data),
};

const components = {
  [ROUTES.HOME]: () => [itemList],
  [ROUTES.ITEM]: ({ views, bus }: Context) => {
    const route = views.route.deref();
    const items = views.items.deref();
    const item = items.find(item => item.id == route.params.id);
    if (item) return [itemFull, item];
    else routeTo(bus, ROUTES.HOME);
  },
  [ROUTES.TAG]: (ctx: Context) => [itemList, ctx.views.route.deref().params.id],
};

export const views: IObjectOf<ViewSpec> = {
  nav: 'nav',
  items: 'items',
  tags: 'tags',

  route: 'route',
  content: ['route.id', id => components[id]],
};

export enum EV {
  ROUTE_TO = 'route-to',
}

export enum FX {
  ROUTE_TO = 'route-to',
}

export const events = {
  [EVENT_ROUTE_CHANGED]: [
    valueSetter('route'),
    dispatchNow([EV_SET_VALUE, ['nav.visible', false]]),
  ],
  [EV.ROUTE_TO]: (_, [__, route]: Event) => ({ [FX.ROUTE_TO]: route }),
};
