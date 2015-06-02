import dbg from 'debug';
import React from 'react';
import { State, Navitation } from 'react-router';
import { OnResize } from 'react-window-mixins';
import TimerMixin from 'react-timer-mixin';
import _ from 'lodash';

import Treemap from './Treemap.jsx';

let debug = dbg('app:components:pd');

var nodes = [
  { id: '1', value: 100 },
  { id: '2', value: 200 },
  { id: '3', value: 300 },
  { id: '4', value: 300 },
  { id: '5', value: 300 },
  { id: '6', value: 300 },
  { id: '7', value: 300 },
  { id: '8', value: 300 },
  { id: '9', value: 300 },
  { id: '10', value: 300 },
  { id: '12', value: 300 },
  { id: '13', value: 300 },
  { id: '14', value: 300 }
];

var PD = React.createClass({
  mixins: [State, Navitation, OnResize, TimerMixin],

  getInitialState() {
    return { nodes: nodes };
  },

  componentDidUpdate() {
    if (this._tid)  this.clearTimeout(this._tid);

    this._tid = this.setTimeout(() => {
      var nodes1 = this.state.nodes.map((x => {
        x.value = _.random(100,1000);
        return x;
      }));
      this.setState({ nodes: nodes1 });
    }, 1000);
  },

  render() {
    return (
      <div id="pd">
        {this.renderTreemap()}
      </div>
    );
  },

  renderTreemap() {
    var win = this.state.window;
    if (win.width == 0) return null;

    return (
      <Treemap 
        width={win.width} 
        height={win.height}
        nodes={this.state.nodes}
        />
    );
  }
});

export default PD;
