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

    var gray = 0;
    var h = 10; 

    p.setup = function() {
      var cnv = p.createCanvas(props.width, props.height);
      p.rectMode(p.CENTER);
    };

    p.draw = function() {
      p.background(gray);
      p.rect(p.width/2, p.height/2, h, h);
    };
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
