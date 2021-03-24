import { map, comp, transduce, push, filter } from "@thi.ng/transducers"
import { EV_TOGGLE_VALUE } from "@thi.ng/interceptors";
import { CLOSE, MENU } from "@thi.ng/hiccup-carbon-icons";

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

const itemTag = (ctx: Context, tag: Tag, highlight: boolean = false) =>
  [routeLink, ROUTES.TAG, { id: tag.name },
    highlight ? ctx.ui.tag.highlight : ctx.ui.tag.normal,
    tag.name];

const itemTags = (_: Context, tags: Tag[], highlight?: string) =>
  ["div", map(tag => [itemTag, tag, tag.name == highlight], tags)];

const itemThumbBg = (ctx: Context, item: Item) => ["div", {
  ...ctx.ui.item.thumb.bg,
  onclick: (e: Event) => {
    e.preventDefault();
    routeTo(ctx.bus, ROUTES.ITEM, { id: item.id });
  }
}];

const itemThumb = (ctx: Context, item: Item, tag?: string) =>
  ["div", ctx.ui.item.thumb.main,
    [itemThumbBg, item],
    ['div', ctx.ui.item.thumb.content,
      [itemThumbTitle, item],
      [itemTags, item.tags, tag]]
  ];

export const itemList = (ctx: Context, tag?: string) => {
  const items = ctx.views.items.deref();
  const res = transduce(
    comp(
      filter(x => !tag || (x as Item).tags.map(t => t.name).includes(tag)),
      map(x => [itemThumb, x, tag])
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
  ["div", ctx.ui.title,
    [routeLink, ROUTES.HOME, null, {}, ["h1", "Zihou Ng"]],
  ];

const navToggle = (ctx: Context) => {
  const navVisible = ctx.views.nav.deref().visible;
  const attribs = {
    ...ctx.ui.nav.button,
    onclick: () => ctx.bus.dispatch([EV_TOGGLE_VALUE, 'nav.visible'])
  };
  return ['div', attribs, navVisible ? CLOSE : MENU];
};

const header = (ctx: Context) =>
  ["div", ctx.ui.header,
    title,
    ["span", ctx.ui.profile, "Creative Programmer"],
    navToggle];

const tagList = (ctx: Context) => {
  const tags = ctx.views.tags.deref();
  return ["div", map((x: Tag) => ['div', x.name], tags)];
};

export const app = (ctx: Context) => {
  const navVisible = ctx.views.nav.deref().visible;
  return ["div", ctx.ui.app,
    header,
    navVisible ? tagList : ctx.views.content];
};
