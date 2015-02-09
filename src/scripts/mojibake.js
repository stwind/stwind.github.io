'use strict';

var React = require('react');

function shuffle (str) {
  var idx = Math.floor(Math.random() * str.length);

  return str[idx];
};

var chars = '═║╒╓╔╕╖╗╘╙╚╛╜╝╞╡╢╣╤╥╦╧╨╩╪╫╬─│┌┐└┘├┤┬┴┼⌠ ∙ √≈≤≥⌡ °²·÷ё©▀▄';

var text = '';

for (var i = 0; i < 1000; i++) {
  text += shuffle(chars);
}

var Mojibake = React.createClass({

  render: function () {
    return (
      <div className="c-mojibake">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    );
  }

});

module.exports = Mojibake;
