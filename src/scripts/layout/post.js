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
      <div className="p-post">
        <div className="c-article" 
             dangerouslySetInnerHTML={{__html: post.content}} />
        <div className="p-post__nexts">
          <ul className="c-nexts">{this.props.next.map(this.renderNexts)}</ul>
        </div>
      </div>
    );
  },

  renderNexts: function(next) {
    return (
      <li className="c-next" key={next}>
        <a className="c-next__link" href={"#" + next} />
      </li>
    );
  }
});

module.exports = Post;
