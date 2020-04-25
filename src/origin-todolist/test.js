import React, { Component } from 'react'
import { directive } from '@babel/types';

class Test extends Component {
  render() {
    console.log("test render");
    return (
      // 这是其实是一个jsx的语法
      <div>{ this.props.content }</div>
    )
  }
}
export default Test;