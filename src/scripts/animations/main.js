'use strict';

angular.module('antagonista')
  .animation('.typein', function($timeout){
    var baseSpeed = 500,
        strBase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!_',
        strBaseLen = strBase.length;

    var randomStr = function(len) {
      return _.reduce(_.range(len), function(acc){
        return acc + strBase[Math.floor(Math.random() * strBaseLen)];
      }, '');
    };

    var forward = function(opts) {
      var text = opts.text,
          curPos = opts.curPos;

      var charPause = text.substr(curPos, 1) === " " ? 120 : 0;

      if (curPos > text.length) {
        opts.done();
      } else {
        opts.elem.text(text.substring(0, curPos) + '_');

        $timeout(function(){
          $timeout(function(){
            forward(_.extend(opts, {curPos: curPos + 1}));
          }, opts.speed);
        }, charPause);
      }
    };

    return {
      addClass: function(elem, className, done) {
        var text = elem.data('text'),
            speed = Math.round(baseSpeed / text.length);

        forward({
          elem: elem, text: text,
          curPos: 0, speed: speed, done: done
        });
      },
      removeClass: function(elem, className, done) {
        console.log('removed',className);
        done();
      }
    }
  });
