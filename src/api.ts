import type { Fn, Path, IID, IObjectOf } from '@thi.ng/api';
import type { IAtom, IView } from '@thi.ng/atom';
import type { EventBus } from '@thi.ng/interceptors';
import type { RouteMatch } from '@thi.ng/router';
import type { DateTime } from '@thi.ng/date';

export type ViewSpec = string | Path | [string | Path, Fn<any, any>];

export interface Tag extends IID<string> {
  name: string;
}

export interface Image {
  name: string;
  width: number;
  height: number;
}

export interface Item extends IID<string> {
  title: string;
  date: DateTime;
  tags: Tag[];
  description?: string;
  url?: string;
  images: Image[];
}

export interface State {
  route?: RouteMatch;
  nav: {
    visible: boolean;
  };
  items: Item[];
  tags: Tag[];
}

export interface UI {
  class: string;
}

export interface Context {
  bus: EventBus;
  state: IAtom<State>;
  views: IObjectOf<IView<any>>;
  ui: IObjectOf<any>;
}
