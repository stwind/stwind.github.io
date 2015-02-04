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
      <div className="c-grid p-post">
        <div className="c-grid__col c-grid__col--1-of-2" dangerouslySetInnerHTML={{__html: post.content}} />
        <div className="c-grid__col c-grid__col--1-of-12 c-grid__col--push-5-of-12">
          <ul>{this.props.next.map(this.renderNexts)}</ul>
        </div>
      </div>
    );
  },

  renderNexts: function(next) {
    return (
      <li className="p-next" key={next}>
        <a className="p-next__link" href={"#" + next} />
      </li>
    );
  }
});

module.exports = Post;
