import React, { Component } from 'react'
import { Input, Button, List } from "antd";
import store from './store'
// import { CHANGE_INPUT_VALUE, ADD_TODOITEM, DELETE_TODOITEM } from './store/actionTypes'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction} from './store/actionCreator'
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    // this.deleteItem = this.deleteItem.bind(this) // 要绑定额外参数，所以写在调用的事件上
    // this.state = {
    //   list: [],
    //   inputValue: ''
    // }
    this.state = store.getState();
    store.subscribe(this.handleStoreChange) // 监听store的变化，自动执行函数
  }
  render() {
    return (
      <div>
        <Input placeholder="请输入todoItem" value={this.state.inputValue} onChange={this.handleChange}/>
        < Button 
          type = "primary"
          onClick = {
            this.addItem
          }
        > 提交 </Button>
        <List
          bordered
          dataSource={this.state.list}
          renderItem={(item,index) => <List.Item onClick={this.deleteItem.bind(this, index)}>{item}</List.Item>}
        />
      </div>
    );
  }
  handleChange(e) {
    // const action = {
    //   type: CHANGE_INPUT_VALUE, // 自定义的类型值，但键值必须为type
    //   value: e.target.value       // 键值对均可自定义
    // }
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
    // const value = e.target.value;
    // console.log(value)
    // this.setState(() => ({
    //   inputValue: value
    // }))
  }
  handleStoreChange() {
    console.log('store changed')
    // 相当于 this.state = store.getState()
    this.setState(store.getState())
  }
  addItem() {
    // const action = {
    //   type: ADD_TODOITEM,
    //   value: this.state.inputValue
    // }
    const action = getAddItemAction(this.state.inputValue)
    store.dispatch(action)
    // this.setState(() => {
    //   return {
    //     list: [...this.state.list, this.state.inputValue],
    //     inputValue: ''
    //   }
    // },
    // function () {
    //   console.log(this.state.list)
    // })
  }
  deleteItem(index) {
    // const action = {
    //   type: DELETE_TODOITEM,
    //   index: index
    // }
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }
}

export default TodoList;