import React, { Component, Fragment } from 'react'
// 以上等价于:
// import { Component } from 'react'
// let Component = react.Component

// jsx的写法
class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'heloo',
      list: []
    }
  }
  render() {
    return (
      <Fragment>
        <div>
          {/* 使用bind改变this指向 */}
          <input type="text" 
            value={this.state.inputValue}
            onChange={ this.handleChange.bind(this) }
          />
          <button>提交</button>
        </div>
        <ul>
          <li>学英语</li>
          <li>学医学</li>
        </ul>
      </Fragment>
    )
  }
  // e是获取到的事件,e.target是获取到的对象元素
  handleChange(e) {
    console.log(e.target.value)  // <input type="text" value="heloo">
    // this.state.inputValue = e.target.value; // 会报错，说找不到state
    console.log(this) // undefined，说明this指向没指向上面的this
    // this.state.inputValue = e.target.value; // 改变this指向后还是不行，这是因为react只支持this.setState来改变数据
    this.setState({
      inputValue: e.target.value
    })
    
  }
}

export default Todolist;

