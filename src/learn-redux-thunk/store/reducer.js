import { CHANGE_INPUT_VALUE, ADD_TODOITEM, DELETE_TODOITEM, INIT_TODOLIST } from './actionTypes'

const defaultState = {
  inputValue: '',
  list: []
}

export default (state = defaultState, action) => {
  // console.log(state, action)
  if(action.type === INIT_TODOLIST) {
    // console.log(action)
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = action.data
    return newState
  }
  if(action.type === CHANGE_INPUT_VALUE) {//
    // 创建一个新的state，因为reducer可以接收state，但不能改变state值，所以要进行深拷贝
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }

  if(action.type === ADD_TODOITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(action.value)
    newState.inputValue = ''
    return newState
  }
  if(action.type === DELETE_TODOITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }
  return state;
}