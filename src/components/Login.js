import React from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
const FormItem = Form.Item;
import axios from 'axios';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {error: undefined};
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          let result = await axios.post("/login", {userName: values.userName, password: values.password});
          console.log('Received values of form: ', result.data.token);
          localStorage.setItem("token", result.data.token);
          let greet = await axios.get("/greet");
          console.log('auth greet', greet.data);
          this.setState({error: false});
        }catch(ex){
          this.setState({error: true});
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
        <FormItem hasFeedback>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {this.state.error && <Alert message="Invalid credentials!" type="error" />}

          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export const LoginForm = Form.create({})(Login);
