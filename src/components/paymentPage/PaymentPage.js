import {
  Select,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Col,
  Row
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
import AuthStore from "../../stores/AuthStore";
import ProductCalendar from "../ProductInfo/ProductCalendar";
import AlertUtils from "../utils/AlertUtils";
import OrderStore from "../../stores/OrderStore";

const { Option } = Select;
const productStore = rootStores[ProductStore];
const paymentStore = rootStores[PaymentStore];
const authStore = rootStores[AuthStore];
const orderStore = rootStores[OrderStore];

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

@observer
class PaymentPage extends React.Component {
  state = { endDate: paymentStore.getStartDate };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.form.validateFields();
    paymentStore.setEndDate(paymentStore.startDate);
    paymentStore.consumerName = authStore.currentUser
      ? authStore.currentUser.username
      : "";
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };

  onShippingCheckBoxChange = e => {
    if (e.target.checked) {
      paymentStore.addDeliveryCommission();
    } else {
      paymentStore.removeDeliveryCommission();
    }
  };

  isPossiblePeriod = (startDate, endDate) => {
    const currentProduct = toJS(paymentStore.getCurrentProduct);
    const oldOrders =
      currentProduct && currentProduct.orders ? currentProduct.orders : [];
    const result = oldOrders.every(oldOrder => {
      if (
        moment(startDate).isBetween(
          oldOrder.start_time,
          oldOrder.finish_time
        ) ||
        moment(endDate).isBetween(oldOrder.start_time, oldOrder.finish_time)
      ) {
        return false;
      }
      return true;
    });
    return result;
  };

  handleChange = value => {
    const curentProduct = paymentStore.currentProduct;
    const planPicked = curentProduct.plans[value];
    paymentStore.plan = planPicked;
    const newEndDate = moment(paymentStore.startDate).add(
      planPicked.period,
      "days"
    );
    if (this.isPossiblePeriod(moment(paymentStore.startDate), newEndDate)) {
      paymentStore.endDate = newEndDate;
      this.setState({ endDate: newEndDate });
      paymentStore.price = parseFloat(planPicked.price);
      AlertUtils.successAlert("Product Available!");
    } else {
      AlertUtils.failureAlert("Sorry, Product already ordered in this date!");
    }
  };
  changeData = () => {
    paymentStore.toggleViewStartDate();
  };

  renderPeriodsOptions = () => {
    const currentProduct = paymentStore.currentProduct;
    return (
      <Select
        defaultValue="Pick rent period"
        style={{ width: 190 }}
        onChange={this.handleChange}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {currentProduct.plans.map((plan, i) => {
          return (
            <Option
              style={{ display: "flex", justifyContent: "space between" }}
              value={i}
            >{`Days: ${plan.period} Price: ${plan.price}$`}</Option>
          );
        })}
      </Select>
    );
  };

  render() {
    const { getFieldsError } = this.props.form;
    const currentProduct = toJS(paymentStore.getCurrentProduct);
    
    if (currentProduct) {
      const orders = currentProduct.orders
      return (
        <div className="payment-page-main-container">
          <Row>
            <Col xs={1} sm={3} md={5} lg={7} xl={9}>
              <Card
                className="payment-page-card"
                title="Order Details"
                style={{
                  width: "500px",
                  margin: "20px",
                  borderRadius: "20px"
                }}
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
                        currentProduct.owner
                          ? currentProduct.owner.username
                          : "no owner"
                      }`}</span>
                      {currentProduct.owner.profile_name && (
                        <span style={{ width: "350px" }}>{`${
                          currentProduct.owner.profile_name
                        }`}</span>
                      )}
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
                        currentProduct.name
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
                          moment(paymentStore.startDate).format("DD/MM/YYYY"),
                          "DD/MM/YYYY"
                        )}
                        format={"DD/MM/YYYY"}
                      />
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
                      Time Period :
                    </span>
                    <Form.Item>{this.renderPeriodsOptions()}</Form.Item>
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
                      End Date :
                    </span>
                    <Form.Item>
                      <DatePicker
                        value={moment(
                          moment(this.state.endDate).format("DD/MM/YYYY"),
                          "DD/MM/YYYY"
                        )}
                        format={"DD/MM/YYYY"}
                        defaultValue={moment(
                          moment(this.state.endDate).format("DD/MM/YYYY"),
                          "DD/MM/YYYY"
                        )}
                        format={"DD/MM/YYYY"}
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Checkbox onChange={e => this.onShippingCheckBoxChange(e)}>
                      Shipping
                    </Checkbox>
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
                        defaultValue={`${paymentStore.getPrice}`}
                        value={`${paymentStore.getPrice}`}
                        formatter={value =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={value => value.replace(/\$\s?|(,*)/g, "")}
                        disabled={true}
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
            </Col>
            <Col xl={1} />
            <Col
              xs={2}
              sm={4}
              md={6}
              lg={8}
              xl={15}
              style={{ paddingTop: "20px" }}
            >
            </Col>
            <PaymentModalPage history={this.props.history} />
          </Row>
        </div>
      );
    } else return <h1>Sorry, Something Went Wrong!</h1>;
  }
}
const PaymentPageForm = Form.create({ name: "paymentForm" })(PaymentPage);
export default PaymentPageForm;
