// import React, { Component } from 'react'
import React from 'react'

// import store from './store'
import { connect } from 'react-redux'

// TodoList只是一个UI组件，可优化成无状态组件
const TodoList = (props) => {
  const { inputValue, changeInputValue, addItem, deleteItem, list } = props
    return (
      <div>
        <div>
          {/* <input value={ this.props.inputValue } onChange={ this.props.changeInputValue } type="text"/> */}
          <input value={ inputValue } onChange={ changeInputValue } type="text"/>
          <button onClick={ addItem }>提交</button>
        </div>
        <ul>
          { list.map((item,index) => {
              return (
                // 使用箭头函数来传递带参数的函数
                <li key={ index } onClick={ () => { deleteItem(index) } }>{ item }</li>
              )
            })
          }
        </ul>
      </div>
    )
}


// class TodoList extends Component {
//   render() {
//     // 优化
//     const { inputValue, changeInputValue, addItem, deleteItem } = this.props
//     return (
//       <div>
//         <div>
//           {/* <input value={ this.props.inputValue } onChange={ this.props.changeInputValue } type="text"/> */}
//           <input value={ inputValue } onChange={ changeInputValue } type="text"/>
//           <button onClick={ addItem }>提交</button>
//         </div>
//         <ul>
//           { this.props.list.map((item,index) => {
//               return (
//                 // 使用箭头函数来传递带参数的函数
//                 <li key={ index } onClick={ () => { deleteItem(index) } }>{ item }</li>
//               )
//             })
//           }
//         </ul>
//       </div>
//     )
//   }
// }

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue(e) {
      console.log(e.target.value)
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action)
    },
    addItem() {
      const action = {
        type: 'add_item'
      }
      dispatch(action)
    },
    deleteItem(index) {
      const action = {
        type: 'delete_item',
        index
      }
      dispatch(action)
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TodoList);