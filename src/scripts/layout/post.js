'use strict';

var React = require('react');
var Router = require('react-router');

var address = require('../address');

var Post = React.createClass({
  mixins: [Router.State],

  render: function () {
    var id = this.props.id;
    var post = require('posts/' + id + '.md');

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: post.content}} />
        <ul>{this.props.next.map(this.renderNexts)}</ul>
      </div>
    );
  },

  renderNexts: function(next) {
    return (
      <li key={next}>
        <a href={"#" + next}>{next}</a>
      </li>
    );
  }
});

module.exports = Post;
