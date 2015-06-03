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
      treemap: treemap
    };
  }

  componentDidMount() {
    this._updateNodes(this.props.nodes);
  }

  componentDidUpdate(nextProps) {
    this._updateNodes(nextProps.nodes);
  }

  _updateNodes(nodes) {
    var props = this.props;
    var treemap = this.state.treemap;

    var data = treemap.size([props.width, props.height])
                      .nodes({ children: nodes })
                      .filter(d => !d.children );

    var svg = React.findDOMNode(this.refs.svg);
    var nodes = d3.select(svg)
                  .selectAll('rect')
                  .data(data, d => d.id)

    function position(selection) {
      selection.attr('width', d => d.dx)
               .attr('height', d => d.dy)
               .attr('x', d => d.x)
               .attr('y', d => d.y);
    }

    nodes.transition()
         .duration(800)
         .call(position);

    nodes.enter()
         .append('rect')
         .attr('fill', 'none')
         .attr('stroke', d3.hsl(0,0,.9).toString())
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
}

Treemap.propTypes = {
  nodes: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    value: React.PropTypes.number
  })).isRequired
};

Treemap.defaultProps = {};
