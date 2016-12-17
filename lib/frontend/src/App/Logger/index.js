import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import classnames from 'classnames';
import io from 'socket.io-client';

const socket = io('http://localhost:3111');

export default class Logger extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    socket.on('log', (data) => {
      const logLine = document.createElement('div');
      logLine.innerHTML = data;
      el.appendChild(logLine);
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <pre className={styles.logger}></pre>
    )
  }
}