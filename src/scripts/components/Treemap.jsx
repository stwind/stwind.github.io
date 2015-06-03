import dbg from 'debug';
import React from 'react';
import d3 from 'd3';

let debug = dbg('app:components:treemap');

export default class Treemap extends React.Component {
  constructor() {
    super();
    var treemap = d3.layout.treemap()
                           .round(true).ratio(1).sticky(true)
                           .sort((a, b) => a.value - b.value);
    this.state = {
      treemap: treemap,
      root: { children: [] }
    };
  }

  // componentWillMount() {
  //   this._updateNodes(this.props.nodes);
  // }

  // componentWillReceiveProps(nextProps) {
  //   this._updateNodes(nextProps.nodes);
  // }

  componentDidMount() {
    this._updateNodes(this.props.nodes);
  }

  componentDidUpdate(nextProps) {
    this._updateNodes(nextProps.nodes);
  }

  _updateNodes(nodes) {
    var props = this.props;
    var root = this.state.root;
    var treemap = this.state.treemap;

    root.children = nodes;
    treemap.size([props.width, props.height]);

    var data = treemap.nodes(root).filter(d => !d.children );

    var self = this;

    var svg = React.findDOMNode(this.refs.svg);
    var nodes = d3.select(svg)
                  .selectAll('rect')
                  .data(data, d => d.id)

    function position(selection) {
      selection.attr('width', d => d.dx)
               .attr('height', d => d.dy)
               .attr('x', d => d.x)
               .attr('y', d => d.y)
               .attr('fill', 'none')
               .attr('stroke', '#d9d9d9');
    }

    nodes.transition()
         .duration(800)
         .call(position);

    nodes.enter()
         .append('rect')
         .call(position);
  }

  render() {
    var nodes = this.state.nodes;
    var props = this.props;
    return (
      <div className="c-treemap">
        <svg ref="svg" width={props.width} height={props.height} />
      </div>
    );
  }

  // renderNode = (node) => {
  //   return (
  //     <div key={node.id}>{node.id},{node.value}</div>
  //   );
  // }
}

Treemap.propTypes = {
  nodes: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    value: React.PropTypes.number
  })).isRequired
};

Treemap.defaultProps = {};
