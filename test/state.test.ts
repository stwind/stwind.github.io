import { expect } from 'chai';
import { Atom, defViewUnsafe } from "@thi.ng/atom";

import { views, initialState } from "../src/config";

it('views', () => {
  const state = new Atom(initialState);
  const itemsById = defViewUnsafe(state, views.itemsById[0], views.itemsById[1]).deref();
  initialState.items.forEach(item => expect(itemsById[item.id]).to.equal(item));
});