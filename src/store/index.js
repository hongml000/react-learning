import { createStore } from 'redux'
import reducer from './reducer'
// 创建一个带图书记录册reducer的图书管理员store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default store;