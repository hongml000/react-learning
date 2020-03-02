import React, { Component } from 'react'

class TodoItem extends Component {
  constructor(props) {
    super(props);
    // 将this指向当前react组件
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    return (
      // this.props.addItem(this.props.index)
      <div onClick={this.handleClick}>{this.props.content}</div>
    )
  }
  handleClick() {
    alert(2)
    console.log(this)   // 问题：为什么不改变this指向时，这时的this是undefined
    this.props.addItem(this.props.index)
  }
}

export default TodoItem;