'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Post = React.createClass({
  mixins: [Router.State],

  render: function () {
    var id = this.getParams().id;
    var post = require('../posts/' + id + '.md');

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: post.content}} />
        <ul>{post.next.map(this.renderNexts)}</ul>
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
