(function (window) {
  var pre = {},
      chars = [
        ["l ", "L ", "ﾚ ", "ʟ ","Ꮮ ", "Ⅼ ","ⅼ "],
        ["o ", "O ", "0 ", "再"],
        ["a ", "A ", "α ","σ ", "Λ ", "Α "],
        ["d ","ｄ", "D ", "ժ ", "ď "],
        ["i ","ｉ","I ","Ꭵ ", "ⅰ ", "見"],
        ["n ", "N "],
        ["g ", "G ", "ɡ ", "ɢ "]
      ],
      seq = [0, 0, 0, 0, 0, 0, 0],
      $pre = document.getElementById('pre'),
      $msg = document.getElementById('msg'),
      started = false;

  function genText () {
    return seq.reduce(function (acc, c, i) {
      return acc + chars[i][c];
    }, '');
  }

  function randInt (v) {
    return Math.floor(Math.random() * v);
  }

  function updateText () {
    var i = randInt(seq.length);
    seq[i] = randInt(chars[i].length);
    $msg.textContent = genText();
  }
  
  function animate () {
    if (started) 
      window.requestAnimationFrame(animate);
    
    updateText();
  }
      
  pre.start = function start () {
    started = true;
    animate();
  };

  pre.stop = function stop (done) {
    setTimeout(function () {
      started = false;
      $pre.parentNode.removeChild($pre);
      setTimeout(function () {
        done();
      }, 300);
    }, 1200);
  };

  window.pre = pre;
})(window);

window.pre.start();
