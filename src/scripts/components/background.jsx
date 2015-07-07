import dbg from 'debug';
import { Rx } from '@cycle/core';
import { h } from '@cycle/web';

var debug = dbg('app:components:background');

function intent ({ dom }) {
  return { };
}

function model (context, user) {
  let state$ = Rx.Observable.just({});
  let props$ = context.props.getAll();
  return props$.combineLatest(state$, (props, state) => ({ props, state }));
}

function view (model$) {
  return model$.map(render);
}

function render ({ props, state }) {
  return (
    <div className="background" hook={new Hook()}>
    </div>
  );
}

export default function background (responses) {
  var actions = intent(responses);

  return {
    dom: view(model(responses, actions)),
    events: {
    }
  };
}

class Cell {
  constructor(x, y, mass) {
    this.reset(x, y);
    this.mass = mass;
  }

  update(vx, vy) {
    this.x += vx / this.mass;
    this.y += vy / this.mass;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }
}

function makeSkecth(props) {
  return function sketch (p) {
    var counter = 0, cells = [];

    p.setup = function setup(){
      p.createCanvas(props.width, props.height);
      p.smooth();
      p.angleMode(p.RADIANS);
      p.frameRate(30);
      generateCells();
      cells.forEach(drawCell);
    }

    p.draw = function draw(){
      p.background(203,51,51);
      // p.background(247, 247, 247);
      var speed = getSpeed();
      cells.forEach(cell => {
        updateCell(cell, speed);
        drawCell(cell);
      });
      updateCounter();
    }

    function drawCell (cell) {
      p.noStroke();
      p.fill(183, 40, 46, 60);
      // p.fill(229, 229, 229, 60);
      var radius = p.random(cell.mass * 1.9, cell.mass * 2.1);
      p.ellipse(cell.x, cell.y, radius, radius);
    }

    function updateCell (cell, { vx, vy }) {
      // cell.update(p.random(-speed, speed), p.random(-speed, speed));
      cell.update(vx, vy);

      if (cell.x + cell.mass < 0) {
        cell.reset(p.width + cell.mass, p.random(p.height));
      }
      else if (cell.x > p.width + cell.mass) {
        cell.reset(-cell.mass, p.random(p.height));
      }
      else if (cell.y < - cell.mass) {
        cell.reset(p.random(p.width), p.height + cell.mass);
      }
      else if (cell.y > p.height + cell.mass) {
        cell.reset(p.random(p.width), -cell.mass);
      }
    }

    function getSpeed () {
      // var speed = counter < props.frameFast ? props.speedSlow: props.speedFast;
      var speed = props.speedSlow;
      var vx = p.cos(p.radians(props.angle)) * speed,
          vy = p.sin(p.radians(props.angle)) * speed;
      return { vx, vy };
    }

    function updateCounter() {
      if (++counter >= props.frameMax) counter = 0;
    }

    function generateCells(){
      for(var i = 0; i < props.numCell; i++){
        var x = p.random(p.width);
        var y = p.random(p.height);
        var rad = p.random(props.minMass, props.maxMass);

        cells.push(new Cell(x, y, rad));
      }
    }
  };
}


function Hook() {}

Hook.prototype.hook = function hook(node) {
  var props = {
    width: node.clientWidth,
    height: node.clientHeight,
    speedSlow: 300, speedFast: 1500,
    frameMax: 45, frameFast: 40,
    minMass: 10, maxMass: 70,
    angle: 330,
    numCell: 350
  };

  var p = this._p = new p5(makeSkecth(props), node);
};

Hook.prototype.unhook = function unhook(node) {
  debug('unhooked');
};
