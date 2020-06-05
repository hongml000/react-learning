# Form表单相关
## Form.Item自定义组件时，未双向绑定
当使用的Item不是antd默认的组件时，将不会自动进行双向绑定，需手动执行双向绑定
```jsx
import {Form} from 'antd'
class Test from Component {
  formRef = React.createRef();
  // 需要自动触发表单值变化
  onChange(value) {
    // 可以改其中一个值，也可以改多个，它会自动合并
    this.formRef.current.setFieldsValue({tt: vlaue})
  }
  render() {
    return (
      <Form>
        <Form.Item name="tt">
          <MyComponent onChange={onChange}>
        <Form.Item>
      </Form>
    )
  }
}
```

## 自定义校验规则
```jsx
validate = (_,value) {
  if(value !== "xxx"){
    return Promise.reject("xxxx")
  }else{
    return Promise.reject()
  }
}
render() {
    return (
      <Form>
        <Form.Item 
          name="tt" 
          rules={[
            {required: true, message: "请输入tt"},
            {max: 30, message: "最大30个字"},
            {pattern: /^\d{2}$/, message:"2位数字"}
            {validate: this.validate}
            // 如果自定义校验方法，要传额外的值
            // {{validate: (_, value) => this.validate(_, value, "想要传的值")}}
          ]}
        >
          <Input />
        <Form.Item>
      </Form>
    )
}
```
## form初始化数据
坑： antd的form不怎么支持双向绑定，起码要以特定的数据格式才能进行双向绑定。详情使用react-redux进行异步获取数据，表单从redux中获取值，但因没有监听什么时候能回传值，所以表单没有及时更新
解决：不使用redux获取数据，因为每次进来的值，要求是实时更新的，所以不要将其放在dispatch中获取，而是使用生命周期，在挂载完成后，获取数据，并在回调中设置表单的初始值
使用的知识：react的生命周期，父组件得等到子组件先挂载完成，才会挂载父组件
```jsx
// father
constucotr(super) {
  this.state = {
    setData: "" // 设置子组件表单的回调
  }
}
// 子组件将设置表单值的回调方法赋予父组件
updateSetData = (setFieldsValue) => {
  this.setState({
    setData: setFieldsValue
  })
}

componentDidMount() {
  const id = this.props.match.params
  // 如果路径存在Id值（说明是详情页），就去获取数据
  if(id) {
    getData().then(res => {
      saveDataToRedux(res.data)
      // 如果存在回调方法，说明之前未有缓存数据，就更新子组件表单的值作为初始值
      this.state.setData && this.state.setData(res.data);
    })
  }
}
render() {
  return <Son updateSetData={this.updateSetData}/>
}


// son
componentDidMount() {
  // 如果发现redux中已经存在对应数据，就直接设置表单值
  if(redux.data) {
    this.formRef.current.setFieldsValue(redux.data)
    // 如果没有的话，就将设置表单值的回调方法传给父组件，让其在获取值时，对表单进行初始化
  }else {
    this.props.updateSetData(this.formRef.current.setFieldsValue)
  }
}
```

# Input文本框自动填充内容时，有彩色背影色
此问题仅在chrome浏览器上存在
解决：设置文本内阴影，且让其足够大，仅适用于纯色背影色可用
```css
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
}
```