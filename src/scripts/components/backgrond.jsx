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
    var cellNumber = 350;
    var speed = 1;
    var speedFast = 10;
    var frameMax = 45;
    var frameFast = 40;
    var minRad = 10;
    var maxRad = 90;

    var counter = 0;

    var cells = [];

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
      return counter < frameFast ? 1: 10;
    }

    function updateCounter() {
      counter++;
      if (counter >= frameMax) counter = 0;
    }

    function generateCells(){
      for(var i = 0; i < cellNumber; i++){
        var x = p.random(p.width);
        var y = p.random(p.height);
        var rad = p.random(minRad, maxRad);

        cells.push(new Cell(x, y, rad));
      }
    }
  };
}


function Hook() {}

Hook.prototype.hook = function hook(node) {
  var props = {
    width: node.clientWidth,
    height: node.clientHeight
  };

  var p = this._p = new p5(makeSkecth(props), node);
};

Hook.prototype.unhook = function unhook(node) {
  debug('unhooked');
};
