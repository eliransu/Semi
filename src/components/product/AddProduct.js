import React from 'react';
import {
  InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout
} from 'antd';
import PicturesWall from "./PictureWall"
import PriceInput from './PriceInput'
import DynamicFieldSet from "./DynamicFieldSet"
import rootStores from '../../stores';
import ProductStore from '../../stores/ProductStore';
 import { observer } from "mobx-react";
import AuthStore from '../../stores/AuthStore';


const { Content } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const productStore = rootStores['ProductStore']
const authStore = rootStores[AuthStore]

@observer
class AddProduct extends React.Component {

  componentDidMount(){
    productStore.newProduct();
  }

  onTitleChange = (e) =>{
    productStore.getCurrentProduct.title = e.target.value;
  }
  onCategorySelect = (e) =>{
    productStore.getCurrentProduct.category = e;
  }
  onSubCategorySelect = (e) =>{
    productStore.getCurrentProduct.subCategory = e;
  }
  onDescripationChange = (e) =>{
    productStore.getCurrentProduct.description = e.target.value;
  }
  onQualitySelect = (e) =>{
    productStore.getCurrentProduct.quality = e;
  }
  onRetailPriceChange = (e) =>{
    console.log('e',e.target.value)
debugger;
    productStore.getCurrentProduct.retailPrice = e.target.value;
  }
  onRetailPriceCoinSelect = (e) =>{
    productStore.getCurrentProduct.retailPriceCoin = e;
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received productStore.currentProduct of form: ', productStore.currentProduct);
        productStore.createProduct(authStore.getCurrentUser.username);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let currentProduct = productStore.getCurrentProduct;
 
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




    return (
      <>


        <Content style={{ paddingTop: "2%", backgroundColor: '#fcfcfc' }}>


          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label={(
                <span>
                  Product title&nbsp;
              </span>
              )}
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input your product title!', whitespace: true }],
              })(
                <Input placeholder="title" onChange={this.onTitleChange}/>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Select category"
            >
              {getFieldDecorator('select-category', {
                rules: [
                  { required: true, message: 'Please select the relevant category!', type: 'string' },
                ],
              })(
                <Select mode="default" placeholder="Please select the relevant category" onSelect={this.onCategorySelect}>
                  <Option value="clothes">Clothes</Option>
                  <Option value="electronics">Electronics</Option>
                  <Option value="tools">Tools</Option>
                  <Option value='home&garden'>Home&Garden</Option>
                  <Option value='games'>Games</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Sub-category"
            >
              {getFieldDecorator('select-subCategory', {
                rules: [
                  { required: true, message: 'Please select sub category!', type: 'string' },
                ],
              })(
                <Select mode="default" placeholder="Please select sub category" onSelect = {this.onSubCategorySelect}>
                  <Option value="sub1">sub 1</Option>
                  <Option value="sub2">sub 2</Option>
                  <Option value="sub3">sub 3</Option>
                </Select>
              )}
            </Form.Item>
            {/* <Form.Item
              {...formItemLayout}
              label={(
                <span>
                  Upload photo's((
              </span>
              )}
            >
              {getFieldDecorator('photo', {
              })(
                )}
                
              </Form.Item> 
            { <div  {...formItemLayout} >
              <PicturesWall /> */}
              {/* <Form.Item {...formItemLayout}
                label={(
                  <span>
                    Time period & pricing
              </span>
                )}>
                {getFieldDecorator('pricing', {
                  rules: [{ required: false }],
                })(
                  <span style={{ display: "flex" }}>
                    <DynamicFieldSet/>
                  </span>
                )}

              </Form.Item> */}

            <Form.Item label="Description" {...formItemLayout}
            >
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: 'please enter product description',
                  },
                ],
              })(<Input.TextArea rows={4} placeholder="please enter product description" onChange={this.onDescripationChange}/>)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Quality"
            >
              {getFieldDecorator('quality', {
                rules: [{ required: true, message: 'Please input your product quality!' }],
              })(
                <Select style={{ width: 120 }} onSelect={this.onQualitySelect}>
                  <Option value="excellent">Excellent</Option>
                  <Option value="good">Good</Option>
                  <Option value="normal">Normal</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Retail price"
            >
              {getFieldDecorator('retailPrice')(
                <PriceInput/>
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" >submit</Button>
            </Form.Item>
          </Form>
        </Content>
      </>

    );
  }
}

export default Form.create()(AddProduct);