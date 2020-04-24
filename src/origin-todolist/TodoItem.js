import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {
  constructor(props) {
    super(props);
    // 将this指向当前react组件，在构造函数就指定this指向，有利于性能优化
    this.handleClick = this.handleClick.bind(this)
    console.log('child constructor')
  }

  componentWillReceiveProps() {
    console.log('child componentWillReceiveProps');
  }
  componentWillMount() {
    console.log('child componentWillMount')
  }
  componentDidMount() {
    console.log('child componentDidMount')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('child shouldComponentUpdate')
    // return true
    
    // 当content内容有所改变时，才允许render
    if(nextProps.content !== this.props.content) {
      return true;
    }else{
      return false;
    }
    
    
  }
  componentWillUpdate() {
    console.log('child componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('child componentDidMount')
  }
  render() {
    console.log('child render')
    // 假设test也是父组件传过来的
    const { content } = this.props; // es6语法优化
    return (
      // 这是其实是一个jsx的语法
      <div onClick={this.handleClick}>{content}</div> // 原来为{this.props.content}
    )
    // 实际过程：jsx -> creactElement -> 虚拟dom(js对象) -> 真实dom
    // return React.createElement('div', {
    //   onClick: this.handleClick
    // }, content, React.createElement('span', {}, 'item'))
  }
  componentWillUnmount() {
    console.log('child componentWillUnmount')
  }

  handleClick() {
    const {deleteItem, index} = this.props; // es6语法优化
    deleteItem(index) // 原来：this.props.deleteItem(this.props.index) 
  }
  
}

TodoItem.propTypes = {
  content: PropTypes.string.isRequired,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
  // test: PropTypes.string.isRequired
};
// TodoItem.defaultProps = {
//   test: "hello"
// };

export default TodoItem;