import React, { Component, Fragment } from 'react'
// 以上等价于:
// import { Component } from 'react'
// let Component = react.Component
import TodoItem from './TodoItem'
// import Test from './test.js'
import axios from 'axios'

import './style.css'
// jsx的写法
class Todolist extends Component {
  constructor(props) {  // 必写
    console.log('parent constructor')
    super(props);   // 必写
    this.state = {
      inputValue: '',
      list: [],//['学英语', '学医学'],
      lastValue: ''
    }
    // 优化
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentWillMount() {
    console.log('parent componentWillMount')
    
  }
  render() {
    console.log('parent render');
    return (
      <Fragment>
        <div>
          {/* 使用bind改变this指向 */}
          {/* 想实现点击label时，聚焦在input框上 */}
          <label htmlFor="inputContent">输入内容：</label>
          <input type="text"
            id="inputContent"
            className="input"
            value={ this.state.inputValue }
            ref={ (input)=>{this.input = input} }
            onChange={ this.handleChange }
          />
          <button onClick={ this.handleClick }>提交</button>
           {/* <Test content = { this.state.inputValue } /> */}
        </div>
        <ul ref={ (ul) => {this.ul = ul} }>
          {/* { this.state.list.smap((item, index) => {
            return (
              <TodoItem 
                key={index} 
                content={item} 
                index={index} 
                deleteItem={this.handleDelete}
              />
            )
          })} */}
          {this.getItem()}
        </ul>
      </Fragment>
    )
  }
  componentDidMount() {
    console.log('parent componentDidMount')
    axios.get('api/todolist', {
      baseURL: 'http://localhost.charlesproxy.com:3000'
    })
      .then((res) => {
        console.log(res.data)
        this.setState(()=>
          // 只有一句时，return {list : [...res.data]}可以简写成括号返回
          ({
            // 建议写成浅拷贝，避免改变res.data的数据
            list : [...res.data]
          })
        )

      })
      .catch((err) => {
        debugger;
        console.log(err)
        alert('error')
      })
  }
  shouldComponentUpdate() {
    console.log('parent shouldComponentUpdate')
    // 必须返回一个值，告知是否能够被更新，true为可被更新，false则不能
    return true;
    // 如果返回true，当改变state时，就会输出: shouldComponentUpdate -> render
    // 如果返回false，当改变state时，发现不能有变化，且输出仅为：shouldComponentUpdate
  }
  componentWillUpdate() {
    console.log('parent componentWillUpdate')
    // 如果shouldComponentUpdate返回true,则输出：shouldComponentUpdate -> componentWillUpdate -> render
  }
  componentDidUpdate() {
    console.log('parent componentDidUpdate')
    // 当改变state时，,则输出：shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
  }
  getItem() {
    // 记得return
    return this.state.list.map((item, index) => {
      return (
        <TodoItem 
            key={item} 
            content={item} 
            index={index} 
            deleteItem={this.handleDelete}
          />
      )
    })
  }
  // e是获取到的事件,e.target是获取到的对象元素
  handleChange(e) {
    // console.log("e.target:", e.target)  // <input type="text" value="heloo">
    // console.log("ref:", this.input) //
    // this.state.inputValue = e.target.value; // 会报错，说找不到state
    // console.log(this) // undefined，说明this指向没指向上面的this
    // this.state.inputValue = e.target.value; // 改变this指向后还是不行，这是因为react只支持this.setState来改变数据
    
    // 原来写法
    // this.setState({
    //   inputValue: e.target.value,
    // })

    // 优化写法
    const value = e.target.value // setState使用函数时是异步的
    this.setState(() => ({  // 注意，函数直接返回一个对象时，要用括号包裹
      inputValue: value // 直接写成e.target.value会报错（TypeError: Cannot read property 'value' of null，所以要定成value形式）
    }))
    
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
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   lastValue: this.state.inputValue,
    //   inputValue: ''
    // },function(){
    //   console.log(this.state.list, this.state.lastValue, this.state.inputValue)
    // })

    this.setState((preState)=>({
      // preState等同于this.state
      list: [...preState.list, preState.inputValue],
      lastValue: preState.inputValue,
      inputValue: ''
    }), function() {
      console.log(this.ul.querySelectorAll('div').length) // 此时个数正常
    })
    

  }
  handleDelete=(index) =>{
    // immutable概念，不允许在state上直接修改数据，否则后面性能优化可能存在问题
    let list = [...this.state.list]   // 拷贝一个副本，在此上面作修改
    list.splice(index,1)
    // 原来写法
    // this.setState({
    //   list: list
    // })
    // 优化后
    this.setState(()=>({
      list  // es6写法
    }))
  }
}

export default Todolist;

