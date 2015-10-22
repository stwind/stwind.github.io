(function (window) {
  var pre = {},
      chars = [
        ["l ", "L ", "ﾚ "],
        ["o ", "O ", "0 ", "再"],
        ["a ", "A ", "α ","σ ", "Λ "],
        ["d ","ｄ", "D ", "∂ "],
        ["i ","ｉ","I ","Ｉ", "見"],
        ["n ", "N "],
        ["g ", "G "]
      ],
      seq = [0, 0, 0, 0, 0, 0, 0],
      fpsInterval = 1000/5, 
      then = Date.now(), now = then, elapsed,
      $pre = document.getElementById('pre'),
      $msg = document.getElementById('msg'),
      started = false;

  function randChar (chars) {
    var i = Math.floor(Math.random() * chars.length);
    return chars[i];
  }

  function genText () {
    var text = '';
    for (var i = 0; i < seq.length; i++) {
      text += chars[i][seq[i]];
    }
    return text;
  }

  function updateText () {
    var i = Math.floor(Math.random() * seq.length);
    seq[i] = Math.floor(Math.random() * chars[i].length);
    $msg.textContent = genText();
  }
  
  function animate () {
    if (started) window.requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval)
      then = now - (elapsed % fpsInterval);
      updateText();
  }
      
  pre.start = function start () {
    started = true;
    animate();
  };

  pre.stop = function stop (done) {
    started = false;
    setTimeout(function () {
      $pre.parentNode.removeChild($pre);
      setTimeout(function () {
        done();
      }, 300);
    }, 1200);
  };

  window.pre = pre;
})(window);

window.pre.start();
