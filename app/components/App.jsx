import './App.css';

import React, { Component } from 'react';
import { RouteHandler } from 'react-router';

import Stage from './Stage';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Stage />
        <RouteHandler/>
      </div>
    );
  }
}
