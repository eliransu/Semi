import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber
} from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import moment from "moment";
import React, { Component } from "react";
import rootStores from "../../stores";
import PaymentStore from "../../stores/PaymentStore";
import ProductStore from "../../stores/ProductStore";
import ImageCarousel from "../ProductInfo/ImageCarousel";
import PaymentModalPage from "./PaymentModalPage";

const productStore = rootStores[ProductStore];
const paymentStore = rootStores[PaymentStore];

const dateFormatList = ["DD/MM/YYYY"];
const { TextArea } = Input;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function onChangeStartDate(date, dateStrings) {
  paymentStore.startDate = dateStrings;
}
function onChangeEndDate(date, dateStrings) {
  paymentStore.startDate = dateStrings;
}
function onChangeRemarks(e) {
  e.preventDefault();
  const pass = e.target.value;
  paymentStore.remarks = pass;
}
function onShippingCheckBoxChange(e) {
  if (e.target.checked) {
    paymentStore.isShipping = true;
    paymentStore.price += 30;
  } else {
    paymentStore.isShipping = false;
    paymentStore.price -= 30;
  }
}
@observer
class PaymentPage extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  onRadioChange = e => {
    this.setState({
      shippingValue: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  changeData = () => {
    paymentStore.toggleViewStartDate();
  };

  render() {
    const { getFieldsError } = this.props.form;

    const currentProduct = toJS(productStore.getCurrentProduct);

    return (
      <div className="payment-page-main-container">
        <div className="payment-page-product-img">
          <ImageCarousel imgList={currentProduct.img} />
        </div>
        <Card
          className="payment-page-card"
          title="Order Details"
          style={{ width: "500px", margin: "20px", borderRadius: "20px" }}
        >
          <Form
            style={{ display: "flex", flexDirection: "column" }}
            className="payment-page-form"
            layout="inline"
            onSubmit={this.handleSubmit}
          >
            <div
              className="payment-page-renter-name"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "10px", width: "70px" }}>
                Renter :
              </span>
              <Form.Item>
                <span style={{ width: "350px" }}>{`${
                  currentProduct.owner.first_name
                }`}</span>
              </Form.Item>
            </div>

            <div
              className="payment-page-product-name"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "10px", width: "70px" }}>
                Product :
              </span>
              <Form.Item>
                <span style={{ width: "350px" }}>{`${
                  currentProduct.title
                }`}</span>
              </Form.Item>
            </div>

            <div
              className="payment-page-product-start-date"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                marginTop: "10px"
              }}
            >
              <span style={{ marginRight: "10px", width: "70px" }}>
                Start Date :
              </span>
              <Form.Item>
                <DatePicker
                  defaultValue={moment(
                    `${paymentStore.startDate}`,
                    dateFormatList
                  )}
                  format={dateFormatList}
                  onChange={onChangeStartDate}
                />
              </Form.Item>
            </div>

            <div
              className="payment-page-product-end-date"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px"
              }}
            >
              <span style={{ marginRight: "10px", width: "70px" }}>
                End Date :
              </span>
              <Form.Item>
                <DatePicker
                  defaultValue={moment(
                    `${paymentStore.startDate}`,
                    dateFormatList
                  )}
                  format={dateFormatList}
                  onChange={onChangeEndDate}
                />
              </Form.Item>
            </div>

            <div
              className="payment-page-renter-remarks"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "10px", width: "70px" }}>
                Remarks :
              </span>
              <Form.Item>
                <TextArea
                  onChange={onChangeRemarks}
                  style={{ width: "350px" }}
                  rows={4}
                />
              </Form.Item>
            </div>

            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <Checkbox onChange={onShippingCheckBoxChange}>Shipping</Checkbox>
            </Form.Item>
            <Divider />
            <div
              className="payment-page-renter-price"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "underline"
              }}
            >
              <span
                style={{
                  marginRight: "10px",
                  width: "90px",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                Total Price :
              </span>
              <Form.Item>
                <InputNumber
                  defaultValue={`${paymentStore.price}`}
                  value={`${paymentStore.price}`}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  disabled={true}
                />
              </Form.Item>
            </div>

            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px"
              }}
            >
              <Button
                style={{ width: "150px" }}
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                onClick={paymentStore.toggleViewModal}
              >
                Pay
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <PaymentModalPage />
      </div>
    );
  }
}
const PaymentPageForm = Form.create({ name: "paymentForm" })(PaymentPage);
export default PaymentPageForm;
