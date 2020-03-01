import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todolist from './Totolist';
// import App from './App'
// import * as serviceWorker from './serviceWorker';     //PWA progressive web application，使用web写app页面

// 注意引入的组件，要以大写开头
ReactDOM.render(<Todolist />, document.getElementById('root'));
