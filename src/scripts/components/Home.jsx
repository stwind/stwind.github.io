import dbg from 'debug';
import React from 'react';
import { State, Navitation } from 'react-router';
import { OnResize } from 'react-window-mixins';
import TimerMixin from 'react-timer-mixin';
import _ from 'lodash';

import NODES from '../nodeData';
import Treemap from './Treemap.jsx';

let debug = dbg('app:components:pd');

var PD = React.createClass({
  mixins: [State, Navitation, OnResize, TimerMixin],

  getInitialState() {
    return { nodes: [] };
  },

  getDefaultProps() {
    return { shuffle: 10 };
  },

  componentWillMount() {
    this.setState({ nodes: NODES });
  },

  componentDidUpdate() {
    if (this._tid) this.clearTimeout(this._tid);

    this._tid = this.setTimeout(() => {
      var nodes = this._shuffleData(this.state.nodes);
      this.setState({ nodes: nodes });
    }, _.random(13,14) * 100);
  },

  _shuffleData(nodes) {
    var shuffle = this.props.shuffle;
    var picks = _(Object.keys(nodes)).shuffle().take(shuffle).value();
    var toZero = picks.slice(0,shuffle / 2);
    var toAdd = picks.slice(shuffle / 2,shuffle);
    var toSwitch = _.zip(toZero, toAdd);

    toSwitch.forEach(([a,b]) => {
      var valA = nodes[a].value;
      nodes[a].value = nodes[b].value;
      nodes[b].value = valA;
    });

    return nodes;
  },

  render() {
    return (
      <div id="pd">
        {this.renderTreemap()}
        {this.renderInfo()}
      </div>
    );
  },

  renderTreemap() {
    var win = this.state.window;
    if (win.width == 0) return null;

    return (
      <div className="p-pd__treemap">
        <Treemap 
          width={win.width} 
          height={win.height}
          nodes={this.state.nodes}/>
      </div>
    );
  },

  renderInfo() {
    return (
      <div className="p-pd__info">
        <div className="p-info">
          <span className="c-line">0x091de4f1</span><br/>
          <span className="c-line">A programmer tells stories by data.</span><br/><br/>
          <span className="c-line">In my toolbox:</span><br/>
          <ul>
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
});

export default PD;
