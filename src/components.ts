import { map } from "@thi.ng/transducers"

import type { Context, Item } from "./api";
import { EV } from "./config";

export const routeLink = (ctx: Context, routeID: PropertyKey, routeParams: any, attribs: any, body: any) => {
  return [
    "a",
    {
      ...attribs,
      onclick: (e: Event) => {
        e.preventDefault();
        ctx.bus.dispatch([EV.ROUTE_TO, [routeID, routeParams]]);
      },
    },
    body,
  ];
}

const itemThumb = (ctx: Context, item: Item) =>
  ["div", ctx.ui.itemThumb, [routeLink, "item", { id: item.id }, ctx.ui.link, item.title]];

export const itemList = (ctx: Context) =>
  ["div", map(x => [itemThumb, x], ctx.views.items.deref())];

export const tags = () => ["div", "tags"];
export const itemDetail = (ctx: Context) =>
  ["div", "item " + ctx.views.route.deref().params.id];

const title = (ctx: Context) => ["h1", ctx.ui.title, "pngupngu"];
export const app = (ctx: Context) =>
  ["div", ctx.ui.app, title, ctx.views.content];
