import React, { Component } from 'react'
import store from './store'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, getTodoList} from './store/actionCreator'
import TodoListUI from './TodoListUI'
// import axios from 'axios'
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.state = store.getState();
    store.subscribe(this.handleStoreChange) // 监听store的变化，自动执行函数
  }
  componentDidMount() {

    // // 获取列表
    // axios.get('http://localhost.charlesproxy.com:3000/api/todolist')
    // .then((res) => {
    //   console.log()
    //   const action = getInitTodoList(res.data)
    //   store.dispatch(action)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
    const action = getTodoList()
    // 当调用dispatch将action传给store时，action（如果是个函数的话）将自动执行
    store.dispatch(action)
  }
  render() {
    return (
      <TodoListUI 
        inputValue={this.state.inputValue}
        handleChange={this.handleChange}
        addItem={this.addItem}
        list={this.state.list}
        deleteItem={this.deleteItem}
      />
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