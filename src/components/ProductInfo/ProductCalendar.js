import React, { Component } from "react";
import { Calendar, Badge, Avatar } from "antd";
import moment from "moment";
import "./ProductCalendar.css";

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." }
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." }
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event。。...." },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." }
      ];
      break;
    default:
  }
  return listData || [];
}

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

export class ProductCalendar extends Component {
  state = {
    orderDaysOfYear: []
  };

  constructor(props) {
    super(props);
    let orders = this.props.data;

    let orderDaysOfYear = [];
    orders.map(order => {
      for (
        let i = moment(order.startDate).dayOfYear();
        i <= moment(order.endDate).dayOfYear();
        i++
      ) {
        orderDaysOfYear.push({
          day: i,
          consumerName: `${order.consumer.first_name} ${
            order.consumer.last_name
          }`,
          consumerAvatar: order.consumer.avatar
        });
      }
    });
    console.log("orderDaysOfYear", orderDaysOfYear);
    this.state = {
      orderDaysOfYear: orderDaysOfYear
    };
  }
  // <Avatar src={require(`../../assets/${item.consumerAvatar}`)} />

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

  dateCellRender = value => {
    const listData = this.convertBorrowDateToListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <>
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
            <li style={{ display: "flex", justifyContent: "center" }}>
              <Avatar src={require(`../../assets/${item.consumerAvatar}`)} />
              <a href=""> {item.consumerName}</a>
            </li>
          </>
        ))}
      </ul>
    );
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
          dateCellRender={this.dateCellRender}
          monthCellRender={monthCellRender}
        />
        ,
      </div>
    );
  }
}
