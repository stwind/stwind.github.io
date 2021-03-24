import type { IObjectOf } from "@thi.ng/api";
import { valueSetter, Event, dispatchNow, EV_SET_VALUE } from "@thi.ng/interceptors";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router";

import type { Context, ViewSpec, Item, Tag } from "./api";
import { itemList, itemDetail } from "./components";
import { uniqueBy } from "./utils";

export enum ROUTES {
  HOME = 'home',
  ITEM = 'item',
  TAG = 'tag',
}

export const routes = [
  { id: ROUTES.HOME, title: "Home page", match: ["home"] },
  { id: ROUTES.ITEM, title: "Item", match: ["items", "?id"], },
  { id: ROUTES.TAG, title: "Tag", match: ["tags", "?id"], },
];

export const ui = {
  app: { class: "px-4 leading-snug" },
  header: { class: "py-5 relative" },
  title: { class: "fs-1 leading-4" },
  profile: { class: "fs--1 text-gray-600" },

  nav: {
    button: { class: "absolute right-0 top-6 blue h-4 w-4" }
  },

  item: {
    thumb: {
      main: { class: "h-40 w mb-3 p-1 relative" },
      bg: { class: "absolute inset-0 bg-gray-300 cursor-pointer" },
      content: { class: "absolute" },
      title: { class: "text-block bg-white text-black fs-0 mb-1" },
    },
  },

  tag: {
    normal: { class: "text-block bg-white text-black fs--1 mr-1" },
    highlight: { class: "text-block bg-black text-white fs--1 mr-1" },
  },

  link: { class: "cursor-pointer" }
};

const makeTags = (names: string[]) => names.map(name => ({ name }));

export const initialState = {
  nav: { visible: false },
  items: [
    { id: "1", title: "Paintings of Butterflies", tags: makeTags(["one", "two", "three"]) },
    { id: "2", title: "Latent Flower GANden", tags: makeTags(["one", "four", "five"]) },
    { id: "3", title: "Exploring Fashion MNIST", tags: makeTags(["three", "four"]) },
  ]
};

const components = {
  [ROUTES.HOME]: () => [itemList],
  [ROUTES.ITEM]: itemDetail,
  [ROUTES.TAG]: (ctx: Context) => [itemList, ctx.views.route.deref().params.id]
};

export const views: IObjectOf<ViewSpec> = {
  nav: "nav",

  items: "items",
  tags: ["items", items => uniqueBy(items.map((x: Item) => x.tags).flat(1), (x: Tag) => x.name)],
  currentItem: ["", ({ items, route }) => route.id == ROUTES.ITEM && items.find(item => item.id == route.params.id)],

  route: "route",
  content: ["route.id", id => components[id]]
};

export enum EV {
  ROUTE_TO = "route-to",
}

export enum FX {
  ROUTE_TO = "route-to",
}

export const events = {
  [EVENT_ROUTE_CHANGED]: [
    valueSetter("route"),
    dispatchNow([EV_SET_VALUE, ['nav.visible', false]]),
  ],
  [EV.ROUTE_TO]: (_, [__, route]: Event) => ({ [FX.ROUTE_TO]: route }),
};
