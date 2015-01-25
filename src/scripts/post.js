'use strict';

var React = require('react');
var Router = require('react-router');

var Post = React.createClass({
  mixins: [Router.State],

  render: function () {
    var id = this.getParams().id;

    var post = require('../nodes/' + id + '.md');

    return (
      <div dangerouslySetInnerHTML={{__html: post.content}} />
    );
  }
});

module.exports = Post;
