import React from 'react' // , { Component } 
import { Input, Button, List } from "antd";

// class TodoListUI extends Component {
//   render() {
//     return (
//       <div>
//         <Input placeholder="请输入todoItem" value={this.props.inputValue} onChange={this.props.handleChange}/>
//         < Button 
//           type = "primary"
//           onClick = {
//             this.props.addItem
//           }
//         > 提交 </Button>
//         <List
//           bordered
//           dataSource={this.props.list}
//           // renderItem={(item,index) => <List.Item onClick={(this.deleteItem.bind(this, index))}>{item}</List.Item>}
//           renderItem={(item,index) => <List.Item onClick={(index) => {this.props.deleteItem(index)}}>{item}</List.Item>}
//         />
//       </div>
//     )
//   }
// }

// 不用处理this，只需要处理父组件传过来的props
const TodoListUI = (props) => {
    // 返回一个jsx
    return (
      <div>
        <Input placeholder="请输入todoItem" value={props.inputValue} onChange={props.handleChange}/>
        < Button 
          type = "primary"
          onClick = {
            props.addItem
          }
        > 提交 </Button>
        <List
          bordered
          dataSource={props.list}
          // renderItem={(item,index) => <List.Item onClick={(this.deleteItem.bind(this, index))}>{item}</List.Item>}
          renderItem={(item,index) => <List.Item onClick={(index) => {props.deleteItem(index)}}>{item}</List.Item>}
        />
      </div>
    )
}
export default TodoListUI