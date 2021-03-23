import { map, comp, transduce, push, filter } from "@thi.ng/transducers"
import { CLOSE, MENU } from "@thi.ng/hiccup-carbon-icons";

import type { Context, Item, Tag } from "./api";
import { ROUTES, EV } from "./config";
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
    [itemTags, item.tags]
  ];

export const itemList = (ctx: Context, tag?: string) => {
  const items = ctx.views.items.deref();
  const res = transduce(
    comp(
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

const title = (ctx: Context) =>
  ["div", ctx.ui.title, [routeLink, ROUTES.HOME, null, {}, ["h1", "pngupngu"]]];

const navToggle = (ctx: Context) => {
  const navOpen = ctx.views.navOpen.deref();
  const attribs = {
    ...ctx.ui.nav.button,
    onclick: () => ctx.bus.dispatch([EV.TOGGLE_NAV])
  };
  return ['div', attribs, navOpen ? CLOSE : MENU];
};

const header = (ctx: Context) => ["div", ctx.ui.header, title, navToggle];

const tagList = (ctx: Context) => {
  const tags = ctx.views.tags.deref();
  return ["div", map((x: Tag) => ['div', x.name], tags)];
};

export const app = (ctx: Context) => {
  const navOpen = ctx.views.navOpen.deref();
  return ["div", ctx.ui.app,
    header,
    navOpen ? tagList : ctx.views.content];
};
