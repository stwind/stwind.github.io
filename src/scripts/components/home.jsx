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
        <span>A programmer.</span>
      </div>
      <div className="c-section">
        <span className="c-title">In my toolbox:</span><br/>
        <ul className="p-skills">
          <li>Erlang Scala Javascript Python R</li>
          <li>MySQL Elasticsearch Riak HDFS</li>
          <li>Spark</li>
          <li>React D3</li>
          <li>RabbitMQ</li>
          <li>Kibana Sensu</li>
          <li>Ansible</li>
          <li>Vim</li>
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
