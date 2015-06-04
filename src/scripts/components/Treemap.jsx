import dbg from 'debug';
import React from 'react';
import tweenState from 'react-tween-state';
import d3 from 'd3';
import _ from 'lodash';

let debug = dbg('app:components:treemap');
const STROKE_COLOE = d3.hsl(0,0,.85).toString(); 

function valueOf(val) {
  return Math.max(0, val);
}

var Treemap = React.createClass({
  mixins: [tweenState.Mixin],

  propTypes: {
    nodes: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      value: React.PropTypes.number
    })).isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  getInitialState() {
    var props = this.props;
    var treemap = d3.layout.treemap()
                           .round(true).ratio(1).sticky(true)
                           .sort((a, b) => a.value - b.value)
                           .size([props.width, props.height]);

    var root = { children: props.nodes };
    var nodes = treemap.nodes(root).filter(d => d.id);

    var nodeStates = {};
    nodes.forEach(node => {
      nodeStates[node.id] = { x: node.x, y: node.y, dx: node.dx, dy: node.dy };
    });

    return { treemap: treemap, root: root, nodeStates: nodeStates };
  },

  componentWillReceiveProps(nextProps) {
    var nodeStates = this._getNodeStates(nextProps.nodes, this.state.nodeStates);
    var data = this._updateNodes(nextProps.nodes);
    this.setState({ nodeStates: nodeStates }, () => {
      this._tweenNodes(data, _.random(7, 9) * 100);
    });
  },

  _getNodeStates(nodes, state) {
    var oldkeys = Object.keys(state);
    var newKeys = nodes.map(n => n.id);

    var missing = _.difference(newKeys, oldkeys);

    missing.forEach(id => {
      state[id] = { x: 0, y: 0, dx: 0, dy: 0 };
    });

    return state;
  },

  _updateNodes(nodes) {
    var props = this.props;
    var treemap = this.state.treemap;
    var root = this.state.root;

    if (!root.children) treemap.sticky(true);
    if (root.children && root.children.length != nodes.length) treemap.sticky(true);

    root.children = nodes;
    treemap.size([props.width, props.height]).nodes(root);

    return root.children;
  },

  _tweenNodes(targets, duration) {
    var config = { duration: duration, easing: tweenState.easeInExpo };

    targets.forEach((d) => {
      var getter = (state) => state.nodeStates[d.id];
      this.tweenState(getter, 'x', _.assign({ endValue: d.x }, config));
      this.tweenState(getter, 'y', _.assign({ endValue: d.y }, config));
      this.tweenState(getter, 'dx', _.assign({ endValue: d.dx }, config));
      this.tweenState(getter, 'dy', _.assign({ endValue: d.dy }, config));
    });
  },

  render() {
    var nodes = this.state.nodeStates;
    var props = this.props;
    return (
      <div className="c-treemap">
        <svg ref="svg" width={props.width} height={props.height}>
          {_.map(nodes,this.renderRect)}
        </svg>
      </div>
    );
  },

  renderRect(node, id) {
    var getter = (state) => state.nodeStates[id];
    var x = valueOf(this.getTweeningValue(getter, 'x'));
    var y = valueOf(this.getTweeningValue(getter, 'y'));
    var dx = valueOf(this.getTweeningValue(getter, 'dx'));
    var dy = valueOf(this.getTweeningValue(getter, 'dy'));
    return (
      <rect key={id}
        x={x} 
        y={y} 
        width={dx} 
        height={dy}
        fill="none"
        stroke={STROKE_COLOE}
        />
    );
  }
});

export default Treemap;
