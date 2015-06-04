import dbg from 'debug';
import React from 'react';
import d3 from 'd3';

let debug = dbg('app:components:treemap');

var Treemap = React.createClass({

  propTypes: {
    nodes: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      value: React.PropTypes.number
    })).isRequired
  },

  getInitialState() {
    var treemap = d3.layout.treemap()
                           .round(true).ratio(1).sticky(true)
                           .sort((a, b) => a.value - b.value);
   return { treemap: treemap };
  },

  componentWillMount() {
    var nodes = this._updateNodes(this.props.nodes);
    this.setState({ nodes: nodes });
  },

  componentWillReceiveProps(nextProps) {
    var nodes = this._updateNodes(nextProps.nodes);
    this.setState({ nodes: nodes });
  },

  _updateNodes(nodes) {
    var props = this.props;
    var treemap = this.state.treemap;

    var data = treemap.size([props.width, props.height])
                      .nodes({ children: props.nodes })
                      .filter(d => !d.children );

    return data;
  },

  render() {
    var nodes = this.state.nodes;
    var props = this.props;
    return (
      <div className="c-treemap">
        <svg ref="svg" width={props.width} height={props.height}>
          {nodes.map(this.renderRect)}
        </svg>
      </div>
    );
  },

  renderRect(node) {
    return (
      <rect key={node.id}
        x={node.x} 
        y={node.y} 
        width={node.dx} 
        height={node.dy}
        fill="none"
        stroke={d3.hsl(0,0,.9).toString()}
        />
    );
  }
});

export default Treemap;
