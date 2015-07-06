import dbg from 'debug';
import { h } from '@cycle/web';

var debug = dbg('app:view');

function render(space) {
  return (
    <div className="main">
      <background key="1" name="shit" />
    </div>
  );
}

export default function View({ space$ }) {
  return space$.map(render);
};
