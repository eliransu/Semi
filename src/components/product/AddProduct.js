import React from 'react';
import {
  InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout,Modal
} from 'antd';
import PicturesWall from "./PictureWall"
import PriceInput from './PriceInput'
import DynamicFieldSet from "./DynamicFieldSet"
import rootStores from '../../stores';
import ProductStore from '../../stores/ProductStore';
import { observer } from "mobx-react";
import AuthStore from '../../stores/AuthStore';
import CustomSteps from '../customComponents/CustomSteps';
import AddProductSuccessModal from './AddProductSuccessModal'



const { Content } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const productStore = rootStores['ProductStore']
const authStore = rootStores[AuthStore]

@observer
class AddProduct extends React.Component {

  state={
    visible:false
  }

  onAddOneMoreProductClicked = ()=>{
    this.setState({visible:false},()=>{

      this.props.history.replace('/add-product-as-renter');
    })

  }

  onHomePageClicked = ()=>{

    this.setState({visible:false},()=>{

      this.props.history.replace('/')
    })
  }

  onProductAdded = (result)=>{
    if(result){
      this.setState({visible:true})
      
    }
  }

  onCancel=()=>{
    this.setState({visible:false})
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
      <CustomSteps onProductAdded={this.onProductAdded}  />
      <Modal visible={this.state.visible} onCancel={this.onCancel} footer={[]}>
      <AddProductSuccessModal onAddOneMoreProductClicked={this.onAddOneMoreProductClicked} onHomePageClicked={this.onHomePageClicked}/>
      </Modal>
      </>
    );
  }
}

export default Form.create()(AddProduct);