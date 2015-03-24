'use strict';

var React = require('react');
var Router = require('react-router');

// var address = require('../address');

var Post = React.createClass({
  mixins: [Router.State],

  render: function () {
    return (
      <div className="p-about">
        <div className="p-about__content">
          <a className="p-about__title" href="#0x091de4f1">0x091de4f1</a>
        </div>
      </div>
    );
  }
});

module.exports = Post;
