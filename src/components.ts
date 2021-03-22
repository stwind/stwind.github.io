import type { Context } from "./api";

const title = (_: any) => ["h1.fs-1", "pngupngu"];

export const app = (({ views }: Context) => {
  const s = views.route.deref();
  return ["div.p-6", title, ["div", s.title]];
});
