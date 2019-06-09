import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Calendar, Badge, Avatar, Button, Icon } from "antd";
import moment from "moment";
import "./ProductCalendar.css";
import PaymentStore from "../../stores/PaymentStore";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { withRouter } from "react-router";
import { toJS } from "mobx";
function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

const paymentStore = rootStores[PaymentStore];
const productStore = rootStores[ProductStore];

class ProductCalendar extends Component {
  state = {
    orderDaysOfYear: []
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prev) {
    let orders = this.props.data;

    orders.map(order => {
      for (
        let i = moment(order.start_time).dayOfYear();
        i <= moment(order.finish_time).dayOfYear();
        i++
      ) {
        this.state.orderDaysOfYear.push({
          day: i,
          consumerName: order.consumer.username,
          consumerAvatar: order.consumer.profile_image
            ? order.consumer.profile_image
            : require("../../assets/eliran.png")
        });
      }
    });
    console.log();
  }

  redirectToPaymentPage = day => {
    paymentStore.currentProduct = productStore.currentProduct;
    paymentStore.providerName = productStore.currentProduct
      ? productStore.currentProduct.owner.username
      : "";
    paymentStore.startDate = day;
    this.props.history.push("/paymentPage");
  };

  convertBorrowDateToListData = value => {
    const consumer = this.state.orderDaysOfYear.filter(
      item => item.day === value.dayOfYear()
    );
    let listData;
    if (
      this.state.orderDaysOfYear.some(item => item.day === value.dayOfYear())
    ) {
      listData = [
        {
          type: "error",
          content: "Product rented by:",
          consumerName: consumer[0]["consumerName"],
          consumerAvatar: consumer[0]["consumerAvatar"]
        }
      ];
    }
    return listData || [];
  };

  renderItem = item => {
    return (
      <div>
        <li style={{ paddingBottom: 7 }} key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
        <li style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={
              item && item.consumerAvatar
                ? item.consumerAvatar
                : require(`../../assets/eliran.png`)
            }
          />
          <a href=""> {item.consumerName}</a>
        </li>
      </div>
    );
  };

  dateCellRender = day => {
    const listData = this.convertBorrowDateToListData(day);
    const dateNotPass = moment(new Date()).dayOfYear() <= day.dayOfYear();
    if (listData.length > 0) {
      return (
        <ul className="events">
          {listData.map(item => this.renderItem(item))}
        </ul>
      );
    } else if (dateNotPass) {
      return (
        <div className="events">
          <Badge status="success" text="Order Now" />
          <Icon
            style={{
              fontSize: "26px"
            }}
            twoToneColor="#87d068"
            type="plus-circle"
            theme="twoTone"
            onClick={() => this.redirectToPaymentPage(day)}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div
        style={{
          width: 1250,
          border: "1px solid #d9d9d9",
          borderRadius: 10,
          margin: "auto"
        }}
      >
        <Calendar
          dateCellRender={day => this.dateCellRender(day)}
          monthCellRender={monthCellRender}
        />
        ,
      </div>
    );
  }
}

export default withRouter(ProductCalendar);
