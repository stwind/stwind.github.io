import React, { Component } from 'react';

import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.section}>
          <span className={styles.title}>stwind</span><br/>
          <span>programmer</span>
        </div>
        <div className={styles.section}>
          <span className={styles.title}>toolbox</span><br/>
          <ul>
            <li>Erlang Scala Javascript Python R</li>
            <li>MySQL Elasticsearch Riak</li>
            <li>React D3 Three</li>
            <li>Ansible</li>
            <li>Vim</li>
          </ul>
        </div>
        <div className={styles.section}>
          <span className={styles.title}>experiments</span><br/>
          <ul>
            <li><a href="http://stwind.github.io/labyrinth-and-dead-sea/">迷路と死海</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
