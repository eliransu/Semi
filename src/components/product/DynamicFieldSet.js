import React from 'react'
import {
  Select,Form, Input, Icon, Button,
} from 'antd';
import PriceInput from './PriceInput';
import rootStores from '../../stores';

const {Option} = Select
let id = 0;

const productStore = rootStores['productStore']

class DynamicFieldSet extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('hereeeeeee');
        
        productStore.getCurrentProduct.pricings = keys.map(key => names[key]);
      }
    });
  }

  onPeriodSelected = (val)=>{
    console.log('value',val);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 0, offset: 0 },
        sm: { span: 20, offset: 0 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <div style={{flexDirection:"row"}}>
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        
        required={false}
        key={k}
      >
      <div style={{display:"flex" ,flexDirection:"row",width:"130%"}}>
        {getFieldDecorator(`pricings[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            message: "Please select time period and price or delete this field.",
          }],
        })(
          <span style={{width:"150%",display:"flex",flexDirection:"row"}}>
          <Select mode="default" placeholder="Time period" style={{ width: '90%',paddingRight:"2%" }}>
              <Option value="for 1 day">for 1 day</Option>
              <Option value="for 1 week">for 1 week</Option>
              <Option value="for 1 month">for 1 month</Option>
            </Select>
            {/* <PriceInput style={{ width: '30%', marginLeft: 8 }}/> */}
            </span>
          //<Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />


        )}
        {keys.length > 1 ? (
          <Icon 
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
          
        ) : null}
        </div>
      </Form.Item></div>
    ));
    return (
      <Form onSubmit={this.handleSubmit} style={{ width: '250%' }}>
        {formItems}
        
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} >
            <Icon type="plus" /> Add time period price
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      
      </Form>
    );
  }
}

  export default Form.create()(DynamicFieldSet);