import React, { Component, Fragment }from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <Fragment>
//       <h1>hello world</h1>
//       <button>toggle</button>
//     </Fragment>
//   );
// }
import { CSSTransition } from "react-transition-group";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      content: 'hello world',
      show: true
    }
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      // 使用fragment标签注意要引入
      <Fragment>
        {/* CSSTransition实现动画:
          in:控制动画执行的属性
          className: 用于标注动画的标识符*
          timeout：动画超时时间
          unmountOnExit：隐藏时移除包裹的dom元素
          appear: 在第一次入场时就要求有动画
        */}
        <CSSTransition
          in={this.state.show}
          timeout={3000}
          classNames="fade"
          unmountOnExit
          appear={true}
        >
          <h1>{this.state.content}</h1>
        </CSSTransition>
        {/* css动画实现 */}
        {/* <h1 className={this.state.show ? "show" : "hide"}>
          {this.state.content}
        </h1> */}
        <button onClick={this.handleClick}>toggle</button>
      </Fragment>
    );
  }
  handleClick() {
    this.setState(() => {
      return {
        // content: this.state.content === this.state.init ? this.state.after : this.state.init,
        show: this.state.show ? false: true
      }
    })
  }
}


export default App;
