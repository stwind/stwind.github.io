import dbg from 'debug';
import React from 'react';
import d3 from 'd3';

let debug = dbg('app:components:treemap');

export default class Treemap extends React.Component {
  constructor() {
    super();
    this.state = {
      treemap: d3.layout.treemap().round(true).sticky(true),
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

    var container = React.findDOMNode(this);
    var nodes = d3.select(container)
                  .selectAll('.node')
                  .data(data, d => d.id)

    nodes.transition()
         .duration(800)
         .style('width', d => d.dx - 1 + 'px')
         .style('height', d => d.dy - 1 + 'px')
         .style('left', d => d.x + 'px')
         .style('top', d => d.y + 'px')
         .select('div')
         .text(d => d.id + ',' + d.value);

    nodes.enter()
         .append('div')
         .attr('class', 'node')
         .style('width', d => d.dx - 1 + 'px')
         .style('height', d => d.dy - 1 + 'px')
         .style('left', d => d.x + 'px')
         .style('top', d => d.y + 'px')
         .append('div')
         .text(d => d.id + ',' + d.value);
  }

  render() {
    var nodes = this.state.nodes;
    return (
      <div className="c-treemap">
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
