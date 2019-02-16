import React from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,Layout
  } from 'antd';
import PicturesWall from "./PictureWall"
import PriceInput from './PriceInput'
import DynamicFieldSet from "./DynamicFieldSet"


  const {Content} = Layout;
  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
  
  const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  
  class AddProduct extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  
    handleWebsiteChange = (value) => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 8 },
          sm: { span: 8 },
        },
      };

      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 12,
            offset: 0,
          },
          sm: {
            span: 8,
            offset: 6,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      );
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  
      return (
        <>
        <h1 style={{textAlign: "center"}}>Add new product</h1>

        <Content style={{ paddingTop:"2%", backgroundColor: '#fcfcfc' }}>

        
        <Form onSubmit={this.handleSubmit}>
          <Form.Item 
            {...formItemLayout}
            label={(
              <span>
                Product title&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('productName', {
              rules: [{ required: true, message: 'Please input your product title!', whitespace: true }],
            })(
              <Input placeholder="title"/>
            )}
          </Form.Item>
         <Form.Item
          {...formItemLayout}
          label="Select category"
        >
          {getFieldDecorator('select-multiple1', {
            rules: [
              { required: true, message: 'Please select the relevent category!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select the relevent category">
              <Option value="clothes">Clothes</Option>
              <Option value="baby stuff">Baby stuff</Option>
              <Option value="sport equipment">Sport equipment</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Sub-category"
        >
          {getFieldDecorator('select-multiple2', {
            rules: [
              { required: true, message: 'Please select sub category!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select sub category">
              <Option value="sub1">sub 1</Option>
              <Option value="sub2">sub 2</Option>
              <Option value="sub3">sub 3</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item 
            {...formItemLayout}
            label={(
              <span>
                Upload photo's
              </span>
            )}
          >
                <PicturesWall/>
          </Form.Item>
        <div  {...formItemLayout} >
          <Form.Item {...formItemLayout}
            label={(
              <span>
                Upload photo's
              </span>
            )}>
            <DynamicFieldSet/>   
          </Form.Item>
          </div>
          
          <Form.Item
            {...formItemLayout}
            label="Habitual Residence"
          >
            {getFieldDecorator('residence', {
              initialValue: ['zhejiang', 'hangzhou', 'xihu'],
              rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
            })(
              <Cascader options={residences} />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Phone Number"
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Website"
          >
            {getFieldDecorator('website', {
              rules: [{ required: true, message: 'Please input website!' }],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Captcha"
            extra="We must make sure that your are a human."
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(
                  <Input />
                )}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>I have read the <a href="">agreement</a></Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
        </Content>
    </>
        
       
      );
    }
  }

export default Form.create()(AddProduct);