import React, { Component } from 'react'
import { Input, Button, List } from "antd";

const data = [
  // 'Racing car sprays burning fuel into crowd.',
  // 'Japanese princess to wed commoner.',
  // 'Australian walks 100km after outback crash.',
  // 'Man charged over missing wedding girl.',
  // 'Los Angeles battles huge wildfires.',
];


class TodoList extends Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      list: [],
      inputValue: ''
    }
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
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
  handleChange(e) {
    const value = e.target.value;
    console.log(value)
    this.setState(() => ({
      inputValue: value
    }))
  }
  addItem() {
    
    this.setState(() => {
      return {
        list: [...this.state.list, this.state.inputValue],
        inputValue: ''
      }
    },
    function () {
      console.log(this.state.list)
    }
  )}
}

export default TodoList;