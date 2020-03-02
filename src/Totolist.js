import React, { Component, Fragment } from 'react'
// 以上等价于:
// import { Component } from 'react'
// let Component = react.Component
import './style.css'
import TodoItem from './TodoItem'
// jsx的写法
class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: ['学英语', '学医学'],
      lastValue: ''
    }
  }
  render() {
    return (
      <Fragment>
        <div>
          {/* 使用bind改变this指向 */}
          {/* 想实现点击label时，聚焦在input框上 */}
          <label htmlFor="inputContent">输入内容：</label>
          <input type="text"
            id="inputContent"
            className="input"
            value={this.state.inputValue}
            onChange={ this.handleChange.bind(this) }
          />
          <button onClick={this.handleClick.bind(this)}>提交</button>

        </div>
        <ul>
          { this.state.list.map((item, index) => {
            return (
              // // 注意就算是里层的，只要是return返回的，最外层都只能有一个容器
              // <Fragment key={index}>
              //   <li dangerouslySetInnerHTML={
              //     {__html: item}
              //   }></li> 
              //   {/* {item} */}
              //   <button onClick={this.handleDelete.bind(this,index)}>delete</button>
              // </Fragment>
              <TodoItem content={item} index={index} addItem={()=>this.handleDelete}/>
            )
          })}
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
      inputValue: e.target.value,
    })
    
  }
  handleClick() {
    // 虽然这种直接改变state数组的方法也可以实现，但IMMUTABLE概念上不允许这么做
    // this.state.list.push(this.state.inputValue) // push方法改变原数据，并返回变性后数组的长度
    // // setState是异步方法
    // this.setState({
    //   list: this.state.list
    // }, function(){
    //   console.log(this.state.list)  //在回调中可以打出异步的结果

    // })
    // console.log(this.state.list)  // 仍是未改变的数组

    this.setState({
      list: [...this.state.list, this.state.inputValue],
      lastValue: this.state.inputValue,
      inputValue: ''
    },function(){
      console.log(this.state.list, this.state.lastValue, this.state.inputValue)
    })

  }
  handleDelete=(index) =>{
    // immutable概念，不允许在state上直接修改数据，否则后面性能优化可能存在问题
    let list = [...this.state.list]   // 拷贝一个副本，在此上面作修改
    list.splice(list.indexOf(index),1)
    console.log(list)
    this.setState({
      list: list
    })
  }
}

export default Todolist;

