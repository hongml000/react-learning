import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from "./todolist";
// 引入antd样式
import "antd/dist/antd.css";
import "./assets/iconfonts/iconfont.css"
import './index.css';

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  // 将store以属性形式提供给组件的props
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root')
)