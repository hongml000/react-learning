import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from "./views/todoList";
// 引入antd样式
import "antd/dist/antd.css";
import "./assets/iconfonts/iconfont.css"
import './index.css';


ReactDOM.render(<TodoList />,document.getElementById('root'))