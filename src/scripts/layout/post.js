import React from 'react';

import address from '../address';

var Post = React.createClass({

  render() {
    var id = this.props.id;
    var post = require('posts/' + id + '.md');

    return (
      <div className={"p-post p-post--" + id}>
        <div className={"p-article p-article--" + id} 
             dangerouslySetInnerHTML={{__html: post.content}} />
        <div className="p-post__nexts">
          <div>{"-------------------------------------"}</div>
          <span>{"ReferenceError: next is not defined "}</span>
          <ul className="c-nexts">{this.props.next.map(this.renderNexts)}</ul>
        </div>
      </div>
    );
  },

  renderNexts(next) {
    var title = address(next)['title'];

    var title1 = title.toLowerCase().replace(/ /g, '.');
    return (
      <li className="c-next" key={next}>
        <span>{' at '}</span>
        <a className="c-next__link" href={"#" + next}>{title1}</a>
        <span>{" (" + next + ") "}</span>
      </li>
    );
  }
});

export default Post;
