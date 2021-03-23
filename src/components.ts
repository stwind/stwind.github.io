import { map, comp, transduce, push, filter } from "@thi.ng/transducers"

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

const itemTag = (ctx: Context, tag: Tag) =>
  [routeLink, ROUTES.TAG, { id: tag.name }, ctx.ui.tag, tag.name];

const itemTags = (_: Context, tags: Tag[]) =>
  ["div", map(tag => [itemTag, tag], tags)];

const itemThumb = (ctx: Context, item: Item) =>
  ["div", ctx.ui.item.thumb.main,
    [itemThumbTitle, item],
    [itemTags, item.tags]];

export const itemList = (ctx: Context, tag?: string) => {
  const items = ctx.views.items.deref();
  const res = transduce(comp(
    filter(x => !tag || (x as Item).tags.map(t => t.name).includes(tag)),
    map(x => [itemThumb, x])
  ),
    push(),
    items);
  return ["div", res];
}

export const itemDetail = (ctx: Context) => {
  const item = ctx.views.currentItem.deref();
  if (item)
    return ["div", item.title];
  else
    routeTo(ctx.bus, ROUTES.HOME);
}

export const tags = () => ["div", "tags"];

const title = (ctx: Context) =>
  [routeLink, ROUTES.HOME, null, {}, ["h1", ctx.ui.title, "pngupngu"]];

export const app = (ctx: Context) =>
  ["div", ctx.ui.app, title, ctx.views.content];
