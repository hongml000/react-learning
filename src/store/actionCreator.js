import { CHANGE_INPUT_VALUE, ADD_TODOITEM, DELETE_TODOITEM, INIT_TODOLIST } from './actionTypes'

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

export const getInitTodoList = (data) => ({
  type: INIT_TODOLIST,
  data
})