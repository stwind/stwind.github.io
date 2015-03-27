'use strict';

var debug = require('debug')('app:layout:gate')
var React = require('react/addons');
var Router = require('react-router');
var d3 = require('d3');
var OnResize = require("react-window-mixins").OnResize;

var line = d3.svg.line()
             .x(function (d) { return d.x; })
             .y(function (d) { return d.y; })
             .interpolate('linear');

function randomInt (min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function deviateInt (base, distance) {
  return randomInt(base - distance, base + distance);
}

var Hint = React.createClass({

  getDefaultProps: function () {
    return { padding: 0 };
  },

  componentDidMount: function () {
    var group = this.refs.group.getDOMNode();

    d3.select(group)
      .append('path')
      .attr('d', this._getPath())
      .attr('stroke', this.props.stroke)
      .attr('fill', 'none');
  },

  _getPath: function () {
    var content = this.refs.content.getDOMNode(),
        padding = this.props.padding,
        bound = content.getBBox(),
        to = this.props.to,
        x1 = bound.x, 
        y1 = bound.y + bound.height;

    var nodes = [
      { x: x1 - padding, y: y1 },
      { x: x1 + bound.width + padding, y: y1 },
      { x: to[0], y: to[1] }
    ];

    return line(nodes);
  },

  render: function () {
    return (
      <g ref="group">
        <g ref="content">
          {this.props.children}
        </g>
      </g>
    );
  }
});

var Force = React.createClass({

  getDefaultProps: function () {
    return {
      linkDistance: 30,
      charge: -60
    };
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({ force: this._getForce(nextProps) });
  },

  _getForce: function (props) {
    var nodes = [{ 
      x: deviateInt(props.width / 2, 40), 
      y: deviateInt(props.height / 2, 40)
    }];

    var force = d3.layout.force()
                  .size([props.width, props.height])
                  .nodes(nodes)
                  .linkDistance(props.linkDistance)
                  .charge(props.charge)
                  .on('tick', this._tick)
                  .start();

    return force;
  },

  _tick: function (e) {
    this.setState({ 
      nodes: this.state.force.nodes(),
      stable: e.alpha < 0.04
    });
  },

  render: function () {
    if (!this.state) return null;

    return (
      <g>
        {this.renderOrb()}
        {this.renderHint()}
      </g>
    );
  },

  renderOrb: function () {
    var node = this.state.force.nodes()[0];

    return (
      <circle cx={node.x || 0} 
              cy={node.y || 0} 
              r="40" />
    );
  },

  renderHint: function () {
    if (!this.state.stable) return null;

    var to = [this.props.width / 2, this.props.height / 2];

    return (
      <Hint to={to} stroke={d3.hsl(0,0,0.5).toString()}>
        <text 
          ref="text" 
          x="450" y="300" 
          className="c-pointer">
          exit
        </text>
      </Hint>
    );
  }
});

var Gate = React.createClass({
  mixins: [OnResize],

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionFrom: function (transition, component, callback) {
    }
  },

  render: function () {
    var win = this.state.window;
    return (
      <div className="p-gate">
        <svg ref="svg" height={win.height} width={win.width}>
          <Force width={win.width} height={win.height} />
        </svg>
      </div>
    );
  }
});

module.exports = Gate;
