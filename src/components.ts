import { map, comp, transduce, push, drop } from '@thi.ng/transducers';
import { link as link_, mergeAttribs } from '@thi.ng/hdom-components';
import { CLOSE, MENU } from '@thi.ng/hiccup-carbon-icons';

import type { Context, Item, Tag, Image } from './api';
import { ROUTES, EV } from './config';
import { routeTo, fmtDate } from './utils';

const link = ({ ui }: Context, attribs: any, href: string, body: any) =>
  link_({ href, ...mergeAttribs(ui.link.default, attribs) }, body);

const linkExtern = (ctx: Context, url: string, name: string) => [
  link,
  ctx.ui.link.external,
  url,
  name,
];

const image = {
  init(el: HTMLElement, __: any, _: any, src: string) {
    const im = el.childNodes[0] as HTMLImageElement;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      im.classList.remove('hidden');
      im.src = src;
    };
  },
  render({ ui }: Context, _attribs: any, src: string, size: [number, number]) {
    const ratio = size[1] / size[0];
    return [
      'div',
      mergeAttribs(ui.image.main, {
        key: src,
        class: 'h-0',
        style: { 'padding-top': `${(ratio * 100).toFixed(2)}%` },
      }),
      ['img', ui.image.content],
    ];
  },
  release() {},
};

const routeLink = (
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

const itemTags = (ctx: Context, tags: Tag[]) => {
  const elms: any[] = [];
  for (const tag of tags) {
    elms.push(['span', ctx.ui.tag.sign, '#']);
    elms.push(['span', ctx.ui.tag.normal, tag.name]);
    elms.push(['span', ', ']);
  }
  elms.pop();
  return ['div', elms];
};

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
    'img',
    {
      src: asset('images', `${item.id}/${item.images[0].name}`),
      ...ctx.ui.item.thumb.image,
    },
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
    [itemTags, item.tags],
  ],
];

export const featuredItemList = (ctx: Context, items: Item[]) => [
  'div',
  ctx.ui.item.list,
  map(x => [itemThumb, x], items),
];

const itemHeader = (ctx: Context, item: Item) => [
  'div',
  ctx.ui.item.full.header,
  ['div', ctx.ui.item.full.date, fmtDate(item.date)],
  ['h1', ctx.ui.item.full.title, item.title],
  ['div', ctx.ui.item.full.tags, [itemTags, item.tags]],
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
    { key: item.id, ...ctx.ui.item.full.main },
    [itemHeader, item],
    [
      'div',
      ctx.ui.item.full.content,
      ['p', [itemImage, item, item.images[0]]],
      ['p', item.description],
      ['p', [linkExtern, item.url, '[link]']],
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
  return [
    'div',
    {
      ...ctx.ui.nav.toggle,
      onclick: () => ctx.bus.dispatch([EV.TOGGLE_NAV]),
    },
    navVisible ? CLOSE : MENU,
  ];
};

const header = (ctx: Context) => ['div', ctx.ui.header, title, navToggle];

const itemSlim = (ctx: Context, item: Item) => [
  'div',
  ctx.ui.item.slim.main,
  ['div', ctx.ui.item.slim.date, fmtDate(item.date)],
  [
    'div',
    ctx.ui.item.slim.body,
    [
      routeLink,
      ROUTES.ITEM,
      { id: item.id },
      ctx.ui.item.slim.title,
      item.title,
    ],
    [itemTags, item.tags],
  ],
];

const itemList = (ctx: Context) => {
  const items = ctx.views.items.deref();
  return ['div', ctx.ui.nav.content, map(item => [itemSlim, item], items)];
};

const nav = {
  init(el: HTMLElement) {
    const linksEl = el.querySelector('[key="links"]');
    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle('-z-1', e.intersectionRatio < 1);
      },
      { threshold: 1.0 }
    );

    observer.observe(linksEl!);
  },
  render(ctx: Context) {
    return [
      'div',
      ctx.ui.nav.main,
      [
        'div',
        {
          key: 'links',
          ...ctx.ui.nav.links,
          style: {
            top: '-1px',
            'padding-top': '1px',
          },
        },
        ['div', [linkExtern, 'https://github.com/stwind', 'github']],
        ['div', [linkExtern, 'https://observablehq.com/@stwind', 'observable']],
        ['div', [linkExtern, 'https://qiita.com/stwind', 'qiita']],
        ['div', ctx.ui.email, 'stwindfy#gmail dot com'],
      ],
      itemList,
    ];
  },
  release() {},
};

export const root = (ctx: Context) => {
  const navVisible = ctx.views.nav.deref().visible;
  return [
    'div',
    ctx.ui.app,
    header,
    ['div', ctx.ui.profile, 'Software Engineer'],
    ['div', ctx.ui.content, navVisible ? [nav] : ctx.views.content],
  ];
};
