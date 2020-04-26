import { CHANGE_INPUT_VALUE, ADD_TODOITEM, DELETE_TODOITEM, INIT_TODOLIST } from './actionTypes'
import axios from 'axios'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const getAddItemAction = (value) => ({
  type: ADD_TODOITEM,
  value
})

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODOITEM,
  index
})

// action原来直接返回一个对象
export const getInitTodoList = (data) => ({
  type: INIT_TODOLIST,
  data
})

// redux thunk使得action可以返回一个函数，使在这个函数中做一些异步操作
export const getTodoList = () => {
  // 当action返回一个函数时，可以接收到dispatch参数
  return (dispatch) => {
      // 获取列表
      axios.get('http://localhost.charlesproxy.com:3000/api/todolist')
      .then((res) => {
        console.log(res.data)
        const action = getInitTodoList(res.data);
        dispatch(action)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}