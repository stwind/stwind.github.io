import type { IObjectOf } from "@thi.ng/api";
import { valueSetter, Event } from "@thi.ng/interceptors";
import { EVENT_ROUTE_CHANGED } from "@thi.ng/router";

import type { ViewSpec } from "./api";
import { itemList, tags, itemDetail } from "./components";

export const routes = [
  { id: "home", title: "Home page", match: ["home"] },
  { id: "item", title: "Item", match: ["items", "?id"], },
  { id: "tag", title: "Tag", match: ["tags", "?id"], },
];

export const ui = {
  app: { class: "p-6" },
  title: { class: "fs-1" },
  itemThumb: { class: "h-12" },
  link: { class: "" }
};

export const initialState = {
  items: [
    { id: "1", title: "one" },
    { id: "2", title: "two" },
    { id: "3", title: "three" },
  ]
};

const components = {
  home: itemList,
  item: itemDetail,
  tag: tags
};

export const views: IObjectOf<ViewSpec> = {
  items: "items",

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
