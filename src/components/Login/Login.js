import {
    Form, Icon, Input, Button,
  } from 'antd';
  import React from 'react';
  import axios from 'axios';
import AuthStore from '../../stores/AuthStore';
import rootStores from '../../stores';

const authStore = rootStores[AuthStore];
  
  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  
  class HorizontalLoginForm extends React.Component {
    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields(async(err, values) => {
        if (!err) {
      const res= await authStore.login(values.userName,values.password)
      console.log(res);
            if(res){
              this.props.onLoginSuccess(authStore.getCurrentUser);
            } 
            
          

          // const body = {
          //   email:values.userName,
          //   password:values.password
          // }

        // axios.post('api/auth/login',body)
        // .then(res=>{
        //   console.log(res.data.data)
        //   if(res&&res.data&&res.data.data){
        //     this.props.onLoginSuccess(res.data.data);

        //   }
        // })

        }
      });
    }
  
    render() {
      const {
        getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
      } = this.props.form;
  
      // Only show error after a field is touched.
      const userNameError = isFieldTouched('userName') && getFieldError('userName');
      const passwordError = isFieldTouched('password') && getFieldError('password');
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input onChange={this.onPasswordChanged} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const Login = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);
  
  export default Login;