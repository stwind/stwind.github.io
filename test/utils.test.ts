import { expect } from 'chai';
import { dateTime, defFormat } from '@thi.ng/date';

it('date parse/format', () => {
  const d = dateTime(Date.parse('2021-03'));
  const fmt = defFormat(['yyyy', '.', 'MM']);
  expect(fmt(d)).to.equal('2021.03');
});
