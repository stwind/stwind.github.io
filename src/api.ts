import type { Fn, Path, IID, IObjectOf } from "@thi.ng/api";
import type { IAtom, IView } from "@thi.ng/atom";
import type { EventBus } from "@thi.ng/interceptors";
import type { RouteMatch } from "@thi.ng/router";

export type ViewSpec = string | Path | [string | Path, Fn<any, any>];

export interface Tag extends IID<string> {
  name: string;
}

export interface Item extends IID<string> {
  title: string;
  tags: Tag[];
  description?: string;
}

export interface State {
  route: RouteMatch;
  navOpen: boolean;
  items: Item[];
}

export interface UI {
  class: string;
}

export interface Context {
  bus: EventBus;
  state: IAtom<State>;
  views: IObjectOf<IView<any>>
  ui: IObjectOf<any>
}
