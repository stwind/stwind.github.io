import dbg from 'debug';
import { Rx } from '@cycle/core';
import { h } from '@cycle/web';

var debug = dbg('app:components:home');

function intent ({ dom }) {
  return { };
}

function model (context, user) {
  let state$ = Rx.Observable.just({});
  let props$ = context.props.getAll();
  return props$.combineLatest(state$, (props, state) => ({ props, state }));
}

function view (model$) {
  return model$.map(render);
}

function render ({ props, state }) {
  return (
    <div className="p-home">
      <div className="c-section">
        <span className="c-title">stwind</span><br/>
        <span>programmer</span>
      </div>
      <div className="c-section">
        <span className="c-title">toolbox</span><br/>
        <ul className="p-skills">
          <li>Erlang Scala Javascript Python R</li>
          <li>MySQL Elasticsearch Riak</li>
          <li>Hadoop Spark</li>
          <li>React D3</li>
          <li>Ansible</li>
          <li>Vim</li>
        </ul>
      </div>
      <div className="c-section">
        <span className="c-title">experiments</span><br/>
        <ul className="p-works">
          <li><a href="http://stwind.github.io/labyrinth-and-dead-sea/">迷路と死海</a></li>
        </ul>
      </div>
    </div>
  );
}

export default function background (responses) {
  var actions = intent(responses);

  return {
    dom: view(model(responses, actions)),
    events: { }
  };
}
