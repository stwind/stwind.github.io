import { map, comp, transduce, push, filter, drop } from '@thi.ng/transducers';
import { EV_TOGGLE_VALUE } from '@thi.ng/interceptors';
import { link as link_, mergeAttribs } from '@thi.ng/hdom-components';
import { CLOSE, MENU } from '@thi.ng/hiccup-carbon-icons';

import type { Context, Item, Tag, Image } from './api';
import { ROUTES } from './config';
import { routeTo } from './utils';

export const link = ({ ui }: Context, href: string, body: any) =>
  link_({ href, ...ui.link.default }, body);

export const image = {
  init(
    el: HTMLImageElement,
    __: any,
    _: any,
    src: string,
    size?: [number, number]
  ) {
    if (size) {
      const rect = el.getBoundingClientRect();
      const aspect = size[0] / size[1];
      el.style.height = `${rect.width / aspect}px`;
    }
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
    ...attribs,
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
  [routeLink, ROUTES.ITEM, { id: item.id }, ctx.ui.link, item.title],
];

const itemTag = (ctx: Context, tag: Tag, highlight: boolean = false) => [
  routeLink,
  ROUTES.TAG,
  { id: tag.name },
  highlight ? ctx.ui.tag.highlight : ctx.ui.tag.normal,
  tag.name,
];

const itemTags = (_: Context, tags: Tag[], highlight?: string) => [
  'div',
  map(tag => [itemTag, tag, tag.name == highlight], tags),
];

const itemTagsSimple = (_: Context, tags: Tag[]) => [
  'div',
  tags.map(x => x.name).join(', '),
];

const assetUrl = (type: string, name: string) => `/assets/${type}/${name}`;

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
    assetUrl('images', `${item.id}/${item.images[0].name}`),
  ],
];

const itemThumb = (ctx: Context, item: Item, tag?: string) => [
  'div',
  ctx.ui.item.thumb.main,
  [itemCover, item],
  [
    'div',
    ctx.ui.item.thumb.content,
    [itemThumbTitle, item],
    [itemTags, item.tags, tag],
  ],
];

export const itemList = (ctx: Context, tag?: string) => {
  const items = ctx.views.items.deref();
  return [
    'div',
    transduce(
      comp(
        filter(x => !tag || (x as Item).tags.map(t => t.name).includes(tag)),
        map(x => [itemThumb, x, tag])
      ),
      push(),
      items
    ),
  ];
};

const itemHeader = (ctx: Context, item: Item) => [
  'div',
  ctx.ui.item.full.header,
  ['h1', ctx.ui.item.full.title, item.title],
  [itemTagsSimple, item.tags],
];

const itemImage = (ctx: Context, item: Item, img: Image) => [
  image,
  ctx.ui.item.full.image,
  assetUrl('images', `${item.id}/${img.name}`),
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
      ['p', [link, item.url, '[link]']],
      ...images,
    ],
  ];
};

const title = (ctx: Context) => [
  'div',
  [routeLink, ROUTES.HOME, null, ctx.ui.title, ['h1', 'Zihou Ng']],
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
    ['span', ctx.ui.profile, 'Creative Programmer'],
    ['div', ctx.ui.content, navVisible ? tagList : ctx.views.content],
  ];
};
