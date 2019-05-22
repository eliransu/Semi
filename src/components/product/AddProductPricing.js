import React, { Component } from "react";
import {
  InputNumber,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Layout
} from "antd";
import PicturesWall from "./PictureWall";
import PriceInput from "./PriceInput";
import DynamicFieldSet from "./DynamicFieldSet";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import AuthStore from "../../stores/AuthStore";
import CustomSteps from "../customComponents/CustomSteps";

const { Content } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const productStore = rootStores[ProductStore];
const authStore = rootStores[AuthStore];
@observer
class AddProductPricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periods: [],
      curentPeriods: "",
      currentPrice: -1
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onDoneClicked();
      }
    });
  };
  onRetailPriceChange = e => {
    this.props.product.retailPrice = e.target.value;
  };
  onPeriodSelected = value => {
    this.setState({ curentPeriods: value });
  };
  onPeriodPricingChanged = val => {
    const value = val;
    this.setState({ currentPrice: value });
  };
  pushToPeriod = () => {
    const period = {
      period: this.state.curentPeriods,
      price: this.state.currentPrice
    };
    this.setState({ periods: [...this.state.periods, period] });
    productStore.addPeriod(period);
  };

  addedClicked = index => {
    if (index) {
      this.pushToPeriod();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 0
        },
        sm: {
          span: 8,
          offset: 6
        }
      }
    };

    return (
      <Content style={{ paddingTop: "2%", backgroundColor: "#fcfcfc" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="Retail price">
            {getFieldDecorator("retailPrice", {
              rules: [
                {
                  required: true,
                  message: "Please enter a retail price"
                }
              ]
            })(
              <Input
                style={{ width: 200 }}
                onChange={this.onRetailPriceChange}
              />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label={<span>Time period & pricing</span>}
          >
            {getFieldDecorator("pricing", {
              rules: [
                { required: true, message: "Pleace enter Price and Period" }
              ]
            })(
              <span style={{ display: "flex" }}>
                <DynamicFieldSet
                  addedClicked={this.addedClicked}
                  onPeriodPricingChanged={this.onPeriodPricingChanged}
                  onPeriodSelected={this.onPeriodSelected}
                />
              </span>
            )}
          </Form.Item>
          <div
            className="steps-action"
            style={{
              display: "flex",
              width: "40%",
              margin: "auto",
              paddingBottom: 25
            }}
          >
            <div style={{ flex: 1 }}>
              <Button
                loading={this.state.loading}
                style={{ marginLeft: 8 }}
                onClick={() => this.props.onPrevClicked()}
              >
                Previous
              </Button>
            </div>
            <div style={{ flex: 1 }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.onDoneClicked}
              >
                Done
              </Button>
            </div>
          </div>
        </Form>
      </Content>
    );
  }
}
export default Form.create()(AddProductPricing);
