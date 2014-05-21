'use strict';

angular.module('antagonista')
  .animation('.typein', ['$timeout', function($timeout){
    var baseSpeed = 300,
    strBase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!_',
    strBaseLen = strBase.length;

    var randomStr = function(len) {
      return _.reduce(_.range(len), function(acc){
        return acc + strBase[Math.floor(Math.random() * strBaseLen)];
      }, '');
    };

    var typewrite = function(opts) {
      var text = opts.text,
      curPos = opts.curPos;

      var charPause = opts.forward ? (text.substr(curPos, 1) === " " ? 120 : 0) : 0;

      if (opts.forward ? curPos > text.length : curPos < 0) {
        opts.done();
      } else {
        opts.elem.text(text.substring(0, curPos) + '_');

        $timeout(function(){
          $timeout(function(){
            typewrite(_.extend(opts, {curPos: curPos + (opts.forward ? 1 : -1)}));
          }, opts.speed);
        }, charPause);
      }
    };

    return {
      addClass: function(elem, className, done) {
        if (className === 'typein') {
          var text = elem.data('text');

          typewrite({
            elem: elem, text: text, curPos: 0, 
            speed: 10, 
            done: done, forward: true
          });
        }
      },
      removeClass: function(elem, className, done) {
        if (className === 'typein') {
          var text = elem.data('text'),
          len = text.length;

          typewrite({
            elem: elem, text: text,
            speed: Math.round(baseSpeed / (len * 4)),
            curPos: len, done: done,
            forward: false
          });
        }
      }
    };
  }]);
