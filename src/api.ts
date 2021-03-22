import type { Fn, Path } from "@thi.ng/api";
import type { IAtom, IView } from "@thi.ng/atom";
import type { EventBus } from "@thi.ng/interceptors";
import type { RouteMatch } from "@thi.ng/router";

export type ViewSpec = string | Path | [string | Path, Fn<any, any>];

export interface Tag {
  name: string;
}

export interface Item {
  title: string;
  tags: Tag[];
  description: string;
}

export interface State {
  route: RouteMatch;
}

export interface Context {
  bus: EventBus;
  state: IAtom<State>;
  views: Record<string, IView<any>>
}
