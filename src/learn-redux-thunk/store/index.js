import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

// 直接复制官网
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  // 括号里为...middleware，这里只用一个thunk中间件，所以只用写一个
  applyMiddleware(thunk)
);


// 创建一个带图书记录册reducer的图书管理员store
const store = createStore(
  reducer,
  enhancer  
  )

export default store;