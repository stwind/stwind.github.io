import { map, comp, transduce, push, drop, filter } from '@thi.ng/transducers';
import { EV_TOGGLE_VALUE } from '@thi.ng/interceptors';
import { link as link_, mergeAttribs } from '@thi.ng/hdom-components';
import { CLOSE, MENU } from '@thi.ng/hiccup-carbon-icons';

import type { Context, Item, Tag, Image } from './api';
import { ROUTES } from './config';
import { routeTo, fmtDate } from './utils';

export const link = ({ ui }: Context, attribs: any, href: string, body: any) =>
  link_({ href, ...mergeAttribs(ui.link.default, attribs) }, body);

export const image = {
  init(el: HTMLImageElement, __: any, _: any, src: string) {
    const img = new Image();
    img.src = src;
    img.onload = () => (el.src = src);
  },
  render({ ui }: Context, attribs: any) {
    return [
      'img',
      {
        src:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=',
        ...mergeAttribs(ui.image.loading, attribs),
      },
    ];
  },
  release() {},
};

export const routeLink = (
  ctx: Context,
  routeID: PropertyKey,
  routeParams: any,
  attribs: any,
  body: any
) => [
  'a',
  {
    ...mergeAttribs(ctx.ui.link.default, attribs),
    onclick: (e: Event) => {
      e.preventDefault();
      routeTo(ctx.bus, routeID, routeParams);
    },
  },
  body,
];

const itemThumbTitle = (ctx: Context, item: Item) => [
  'div',
  ctx.ui.item.thumb.title,
  [routeLink, ROUTES.ITEM, { id: item.id }, null, item.title],
];

const itemTagsSimple = (_: Context, tags: Tag[]) => [
  'div',
  tags.map(x => '#' + x.name).join(', '),
];

const asset = (type: string, name: string) => `/assets/${type}/${name}`;

const itemCover = (ctx: Context, item: Item) => [
  'div',
  {
    ...ctx.ui.item.thumb.cover,
    onclick: (e: Event) => {
      e.preventDefault();
      routeTo(ctx.bus, ROUTES.ITEM, { id: item.id });
    },
  },
  [
    image,
    ctx.ui.item.thumb.image,
    asset('images', `${item.id}/${item.images[0].name}`),
  ],
];

const itemThumb = (ctx: Context, item: Item) => [
  'div',
  ctx.ui.item.thumb.main,
  [itemCover, item],
  [
    'div',
    ctx.ui.item.thumb.content,
    ['div', ctx.ui.item.thumb.date, fmtDate(item.date)],
    [itemThumbTitle, item],
    [itemTagsSimple, item.tags],
  ],
];

export const itemList = (ctx: Context, items: Item[]) => [
  'div',
  ctx.ui.item.list,
  transduce(
    comp(
      filter(x => x.featured),
      map(x => [itemThumb, x])
    ),
    push(),
    items
  ),
];

const itemHeader = (ctx: Context, item: Item) => [
  'div',
  ctx.ui.item.full.header,
  ['div', ctx.ui.item.full.date, fmtDate(item.date)],
  ['h1', ctx.ui.item.full.title, item.title],
  [itemTagsSimple, item.tags],
];

const itemImage = (ctx: Context, item: Item, img: Image) => [
  image,
  ctx.ui.item.full.image,
  asset('images', `${item.id}/${img.name}`),
  [img.width, img.height],
];

export const itemFull = (ctx: Context, item: Item) => {
  const images = transduce(
    comp(
      drop(1),
      map(img => ['p', [itemImage, item, img]])
    ),
    push(),
    item.images
  );
  return [
    'div',
    ctx.ui.item.full.main,
    [itemHeader, item],
    [
      'div',
      ctx.ui.item.full.content,
      ['p', [itemImage, item, item.images[0]]],
      ['p', item.description],
      ['p', [link, ctx.ui.link.external, item.url, '[link]']],
      ...images,
    ],
  ];
};

const title = (ctx: Context) => [
  routeLink,
  ROUTES.HOME,
  null,
  null,
  ['h1', ctx.ui.title, 'Zihou Ng'],
];

const navToggle = (ctx: Context) => {
  const navVisible = ctx.views.nav.deref().visible;
  const attribs = {
    ...ctx.ui.nav.button,
    onclick: () => ctx.bus.dispatch([EV_TOGGLE_VALUE, 'nav.visible']),
  };
  return ['div', attribs, navVisible ? CLOSE : MENU];
};

const header = (ctx: Context) => ['div', ctx.ui.header, title, navToggle];

const tagList = (_: Context) => {
  return ['div', 'fuck'];
  // const tags = ctx.views.tags.deref();
  // return ["div", map((x: Tag) => ['div', x.name], tags)];
};

export const app = (ctx: Context) => {
  const navVisible = ctx.views.nav.deref().visible;
  return [
    'div',
    ctx.ui.app,
    header,
    ['div', ctx.ui.profile, 'Creative Programmer'],
    ['div', ctx.ui.content, navVisible ? tagList : ctx.views.content],
  ];
};
