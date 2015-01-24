'use strict';

var React = require('react');
var Router = require('react-router');

var NodeElm = React.createClass({
  mixins: [Router.State],
  render: function () {
    return (
      <div>
        <p>{this.getParams().nodeid}</p>
      </div>
    );
  }
});

module.exports = NodeElm;
