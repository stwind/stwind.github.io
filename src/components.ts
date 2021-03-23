import { map } from "@thi.ng/transducers"

import type { Context, Item, Tag } from "./api";
import { ROUTES } from "./config";
import { routeTo } from "./utils"

export const routeLink = (ctx: Context, routeID: PropertyKey, routeParams: any, attribs: any, body: any) =>
  ["a", {
    ...attribs,
    onclick: (e: Event) => {
      e.preventDefault();
      routeTo(ctx.bus, routeID, routeParams);
    },
  }, body];

const itemThumbTitle = (ctx: Context, item: Item) =>
  ["div", ctx.ui.item.thumb.title,
    [routeLink, ROUTES.ITEM, { id: item.id }, ctx.ui.link, item.title]];

const itemTags = (ctx: Context, tags: Tag[]) =>
  ["div", map(t => ['span', ctx.ui.tag, t.name], tags)];

// const itemThumbBg = (ctx: Context) =>
//   ["div", ctx.ui.item.thumb];

const itemThumb = (ctx: Context, item: Item) =>
  ["div", ctx.ui.item.thumb.main,
    [itemThumbTitle, item],
    [itemTags, item.tags]];

export const itemList = (ctx: Context) =>
  ["div", map(x => [itemThumb, x], ctx.views.items.deref())];

export const itemDetail = (ctx: Context) =>
  ["div", "item " + ctx.views.route.deref().params.id];

export const tags = () => ["div", "tags"];

const title = (ctx: Context) => ["h1", ctx.ui.title, "pngupngu"];
export const app = (ctx: Context) =>
  ["div", ctx.ui.app, title, ctx.views.content];
