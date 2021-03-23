import type { IObjectOf } from "@thi.ng/api";
import { valueSetter, Event } from "@thi.ng/interceptors";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router";

import type { ViewSpec } from "./api";
import { itemList, tags, itemDetail } from "./components";

export enum ROUTES {
  HOME = 'home',
  ITEM = 'item',
  TAGS = 'tags',
}

export const routes = [
  { id: ROUTES.HOME, title: "Home page", match: ["home"] },
  { id: ROUTES.ITEM, title: "Item", match: ["items", "?id"], },
  { id: ROUTES.TAGS, title: "Tag", match: ["tags", "?id"], },
];

export const ui = {
  app: { class: "px-5" },
  title: { class: "py-5 fs-1" },

  item: {
    thumb: {
      main: { class: "h-32 bg-gray-300 mb-4 p-2" },
      title: { class: "inline-block bg-black text-white px-1" },
    },
  },

  tag: { class: "inline-block bg-black text-white mr-1 px-1 fs--1" },

  link: { class: "" }
};

const makeTags = names => names.map(name => ({ name }));

export const initialState = {
  items: [
    { id: "1", title: "Paintings of Butterflies", tags: makeTags(["one", "two", "three"]) },
    { id: "2", title: "Latent Flower GANden", tags: makeTags(["one", "four", "five"]) },
    { id: "3", title: "Exploring Fashion MNIST", tags: makeTags(["three", "four"]) },
  ]
};

const components = {
  [ROUTES.HOME]: itemList,
  [ROUTES.ITEM]: itemDetail,
  [ROUTES.TAGS]: tags
};

export const views: IObjectOf<ViewSpec> = {
  items: "items",
  itemsById: ["items", items => Object.fromEntries(items.map(item => [item.id, item]))],

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
  [EVENT_ROUTE_CHANGED]: valueSetter("route"),
  [EV.ROUTE_TO]: (_, [__, route]: Event) => ({ [FX.ROUTE_TO]: route }),
};
