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
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  update(vx, vy) {
    this.x += vx;
    this.y += vy;
  }
}

function makeSkecth(props) {
  return function sketch (p) {
    var counter = 0, cells = [];

    p.setup = function setup(){
      p.createCanvas(props.width, props.height);
      p.background(255);
      p.smooth();
      generateCells();
      cells.forEach(drawCell);
    }

    p.draw = function draw(){
      p.background(255);
      var speed = getSpeed();
      cells.forEach(cell => updateCell(cell, speed));
      updateCounter();
    }

    function drawCell (cell) {
      p.noStroke();
      p.fill(203,51,51,120);
      p.ellipse(cell.x, cell.y, cell.radius * 2, cell.radius * 2);
    }

    function updateCell (cell, speed) {
      cell.update(p.random(-speed, speed), p.random(-speed, speed));
      drawCell(cell);
    }

    function getSpeed () {
      return counter < props.frameFast ? props.speedSlow: props.speedFast;
    }

    function updateCounter() {
      counter++;
      if (counter >= props.frameMax) counter = 0;
    }

    function generateCells(){
      for(var i = 0; i < props.numCell; i++){
        var x = p.random(p.width);
        var y = p.random(p.height);
        var rad = p.random(props.minRad, props.maxRad);

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
    speedSlow: 1, speedFast: 10,
    frameMax: 45, frameFast: 40,
    minRad: 10, maxRad: 90,
    numCell: 350
  };

  var p = this._p = new p5(makeSkecth(props), node);
};

Hook.prototype.unhook = function unhook(node) {
  debug('unhooked');
};
