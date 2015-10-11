(function (window) {
  var pre = {},
      chars = "的就而回就傷是你選了是憶越擇越人甜",
      $pre = document.getElementById('pre'),
      $msg = document.getElementById('msg'),
      started = false;

  function randChar() {
    var i = Math.floor(Math.random() * chars.length);
    return chars[i];
  }

  function randText (len) {
    var text = '';
    for (var i = 0; i < len; i++) {
      text += randChar();
    }
    return text;
  }

  function updateText () {
    var text = randText(2) + '再' + randText(1) + '，' + 
               randText(7) + '見' + randText(3) + '。';
    $msg.textContent = text;
  }

  function finalText () {
    var text = '　　再　　　　　　　　　見　　　　';
    $msg.textContent = text;
  }

  function step () {
    updateText();
    if (started) {
      window.requestAnimationFrame(step);
    }
  }
      
  pre.start = function start () {
    started = true;
    step();
  };

  pre.stop = function stop (done) {
    setTimeout(function () {
      started = false;
      setTimeout(function () {
        updateText();
        setTimeout(function () {
          updateText();
          setTimeout(function () {
            updateText();
            setTimeout(function () {
              updateText();
              setTimeout(function () {
                finalText();
                setTimeout(function () {
                  $pre.parentNode.removeChild($pre);
                  done();
                }, 800);
              }, 600);
            }, 500);
          }, 400);
        }, 300);
      }, 200);
    }, 1000);
  };

  window.pre = pre;
})(window);

window.pre.start();
