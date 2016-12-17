import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.global.css';

const view = document.createElement('div');
document.body.appendChild(view);

ReactDOM.render(
  <App data={window.__API_MOCKER_DATA__}/>, 
  view
);