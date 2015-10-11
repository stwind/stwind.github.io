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

  function finalText1 () {
    var text = '　　再　　　　　　　　　見　　　。';
    $msg.textContent = text;
  }

  function finalText2 () {
    var text = '　　　　　　　　　　　　　　　　。';
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
      setTimeout(function () { updateText(); }, 200);
      setTimeout(function () { updateText(); }, 500);
      setTimeout(function () { updateText(); }, 900);
      setTimeout(function () { updateText(); }, 1400);
      setTimeout(function () { finalText1(); }, 2000);
      setTimeout(function () { finalText2(); }, 2800);
      setTimeout(function () {
        $pre.parentNode.removeChild($pre);
        done();
       }, 3800);
    }, 1000);
  };

  window.pre = pre;
})(window);

window.pre.start();
