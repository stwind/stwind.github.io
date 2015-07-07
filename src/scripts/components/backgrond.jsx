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

function makeSkecth(props) {
  return function sketch (p) {
    var cellNumber = 350;
    var speed = 1;
    var speedFast = 10;
    var frameMax = 45;
    var frameFast = 40;
    var minRad = 10;
    var maxRad = 90;

    var _cellArr = [];

    p.setup = function setup(){
      p.createCanvas(props.width, props.height);
      p.background(255);
      p.smooth();
      generateCells();
    }

    p.draw = function draw(){
      p.background(255);
      for(var i=0; i < _cellArr.length; i++){
        var cell = _cellArr[i];
        cell.update();
      }
    }

    function generateCells(){
      for(var i=0; i < cellNumber; i++){
        var cell = new BloodCell();
        cell.genarate();
        _cellArr.push(cell);
      }
    }

    function BloodCell() {
      var x,y,vx,vy,rad;
      this.counter = 0;
      x = p.random(p.width);
      y = p.random(p.height);
      rad = p.random(minRad,maxRad);
      vx = p.random(-speed,speed);
      vy = p.random(-speed,speed);

      this.genarate = function(){
        p.noStroke();
        p.fill(203,51,51,120);
        p.ellipse(x,y,rad*2,rad*2);
      }

      this.update = function()
      {
        if(this.counter < frameFast){
          vx = p.random(-speed,speed);
          vy = p.random(-speed,speed);
        }else{
          vx = p.random(-speedFast,speedFast);
          vy = p.random(-speedFast,speedFast);
        }
        this.counter++;
        if(this.counter == frameMax)this.counter = 0;

        x += vx;
        y += vy;

        this.genarate();
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
