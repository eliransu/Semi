import React, { Component } from "react";
import {
  List,
  Button,
  InputNumber,
  Avatar,
  Tag,
  Divider,
  Col,
  Row
} from "antd";
import moment from "moment";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import OrderStore from "../../stores/OrderStore";
import AlertUtil from "../utils/AlertUtils";

const productStore = rootStores[ProductStore];
const orderStore = rootStores[OrderStore];
@observer
class OrderDetailsPopUp extends Component {
  
  componentDidMount() {
    const order = this.props.order;

    productStore.getProductById(order.product).then(res => {
      if (res) {
        //this.setState({ loading: false });
      }
    });
  }

  state = {
    loadingAccept: false,
    loadingDecline: false
  };

  onOrderStatusClicked = async (order, accept) => {
    try {
      const result = await orderStore.changeOrderStatus(order, accept);
      if (result) {
        AlertUtil.successAlert("Request Success");
        await orderStore.loadAllOrders();
      }
    } catch (err) {
      AlertUtil.failurAlert(err);
    }
    this.setState({ loadingDecline: false, loadingAccept: false });
    this.props.closeModal();
  };

  render() {
    const order = this.props.order;
    const buttonDisable = order.order_status === OrderStatus.Hendeled;
    const pStyle = {
      fontSize: 16,
      color: "rgba(0,0,0,0.85)",
      lineHeight: "24px",
      display: "block",
      marginBottom: 16
    };
    const DescriptionItem = ({ title, content }) => (
      <div
        style={{
          fontSize: 14,
          lineHeight: "22px",
          marginBottom: 7,
          color: "rgba(0,0,0,0.65)"
        }}
      >
        <p
          style={{
            marginRight: 8,
            display: "inline-block",
            color: "rgba(0,0,0,0.85)"
          }}
        >
          {title}:
        </p>
        {content}
      </div>
    );
    return (
      <div className="order-details" style={{ width: "400px" }}>
        <p
          style={{
            ...pStyle,
            marginBottom: 24,
            marginTop: 20,
            textAlign: "center"
          }}
        >
          Order Details
          <Divider />
        </p>
        <p style={pStyle}>Renter Profile</p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Full Profile"
              content={
                <>
                  <Avatar src={order.consumer.profile_image} />
                  <a>
                    {order.consumer.first_name}
                    {order.consumer.last_name}
                  </a>
                </>
              }
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phone"
              content={
                order.consumer.phone_number
                  ? order.consumer.phone_number
                  : "Not entered"
              }
            />
          </Col>
          <Col span={12} />
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Country"
              content={
                order.consumer.address
                  ? order.consumer.address.country
                  : "Not entered"
              }
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="City"
              content={
                order.consumer.address
                  ? order.consumer.address.city
                  : "Not entered"
              }
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Address"
              content={
                order.consumer.address
                  ? order.consumer.address.street
                  : "Not entered"
              }
            />
          </Col>
        </Row>
        <Divider />
        <p style={pStyle}>Order Details</p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Start Date"
              content={moment(order.start_time).format("DD-MM-YYYY")}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="End Date"
              content={moment(order.finish_time).format("DD-MM-YYYY")}
            />
          </Col>
        </Row>
        <Row>
          <Col
            span={11}
            style={{ display: "flex", flexWrap: "nowrap", overflow: "auto" }}
          >
            <DescriptionItem
              title="Product"
              content={
                <a href={`/productPage/${order.product._id}`}>
                  {order.product.name}
                </a>
              }
            />
          </Col>
          <Col span={12} style={{ paddingLeft: "15px" }}>
            <DescriptionItem
              title="Delivery"
              content={
                order.delivery ? (
                  <Tag color="green">yes</Tag>
                ) : (
                  <Tag color="red">no</Tag>
                )
              } //user rent the product with delivery
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Renter Notes"
              content={order.remarks ? order.remarks : "No notes"}
            />
          </Col>
        </Row>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <p
            style={{
              ...pStyle,
              textDecoration: "underline",
              padding: "5px"
            }}
          >
            Total Profit:
          </p>
          <InputNumber
            defaultValue={order && order.plan ? order.plan.price : "0"}
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={value => value.replace(/\$\s?|(,*)/g, "")}
            disabled={true}
          />
        </div>
        <Row>
          <Col span={25}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                padding: "10px"
              }}
            >
              <Button
                onClick={() => {
                  this.setState({ loadingDecline: false });
                  this.onOrderStatusClicked(order, false);
                }}
                type="danger"
                loading={this.state.loadingDecline}
              >
                Decline
              </Button>
              <Button
                onClick={() => {
                  this.setState({ loadingAccept: true });
                  this.onOrderStatusClicked(order, true);
                }}
                type="primary"
                loading={this.state.loadingAccept}
              >
                Accept
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default OrderDetailsPopUp;
