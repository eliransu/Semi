import React from 'react'
import {
    Form, Input, Select, Button,
  } from 'antd';
import rootStores from '../../stores';
  
  const { Option } = Select;
  const productStore = rootStores['ProductStore']

  class PriceInput extends React.Component {
    static getDerivedStateFromProps(nextProps) {
      // Should be a controlled component.
      if ('value' in nextProps) {
        return {
          ...(nextProps.value || {}),
        };
      }
      return null;
    }
  
    constructor(props) {
      super(props);
  
      const value = props.value || {};
      this.state = {
        number: value.number || '',
        currency: value.currency || 'NIS',
      };
    }
  
    handleNumberChange = (e) => {
      const number = parseInt(e.target.value || 0, 10);
      if (Number.isNaN(number)) {
        return;
      }
      if (!('value' in this.props)) {
        this.setState({ number });

      }
      productStore.getCurrentProduct.retailPrice = e.target.value;
      this.triggerChange({ number });
    }
  
    handleCurrencyChange = (currency) => {
      if (!('value' in this.props)) {
        this.setState({ currency });
      }
      productStore.getCurrentProduct.retailPriceCoin = currency;
      this.triggerChange({ currency });
    }
  
    triggerChange = (changedValue) => {
      // Should provide an event to pass value to Form.
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(Object.assign({}, this.state, changedValue));
      }
    }
  
    render() {
      const { size } = this.props;
      const state = this.state;
      return (
        <span style={{display:"flex",flexDirection:"row"}}>
          <Input
            type="text"
            size={size}
            onChange={this.handleNumberChange}
            style={{  width: '60%', marginRight: '3%' }}
          />
        
        </span>
      );
    }
  }
  
  
  
  export default PriceInput;