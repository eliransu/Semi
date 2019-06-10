import React, { Component } from "react";
import { Table, Divider, Tag } from "antd";
import { observer } from "mobx-react";
import rootStores from "../../stores";
import OrderStore from "../../stores/OrderStore";
import { toJS } from "mobx";
import ViewStore from "../../stores/ViewStore";
import moment from "moment";
import AddReview from "./AddReview";
import { NavLink } from "react-router-dom";

const orderStore = rootStores[OrderStore];
const viewStore = rootStores[ViewStore];
@observer
class OrdersReview extends Component {
  async componentDidMount() {
    viewStore.appLoadingBoolean = false;
    try {
      await orderStore.loadOrdersAsConsumer();
    } catch (err) {
      console.log(err);
    } finally {
      viewStore.appLoadingBoolean = true;
    }
  }

  onAddReviewClick = data => {
    orderStore.toggleAddReview();
    orderStore.data = data;
  };
  render() {
    const orders = orderStore.getAllOrdersAsConsumer
      ? orderStore.getAllOrdersAsConsumer
      : [];

    const columns = [
      {
        title: "Product Name",
        dataIndex: "product.name",
        key: "product.name",
        render: (text, record) => (
          <NavLink
            style={{ textDecoration: "underline" }}
            to={`/productPage/${record.product._id}`}
          >
            {text}
          </NavLink>
        )
      },
      {
        title: "Category",
        dataIndex: "product.category.name",
        key: "product.category.name"
      },
      {
        title: "image",
        dataIndex: "product.images.0",
        render: (text, record) => (
          <img src={`${record.product.images}`} height="42" width="42" />
        )
      },
      {
        title: "Provider",
        dataIndex: "provider.username",
        key: "age"
      },
      {
        title: "Plan Period",
        dataIndex: "plan.period",
        key: "plan.period"
      },
      {
        title: "Plan Price",
        dataIndex: "plan.price",
        key: "plan.price"
      },
      {
        title: " order Status",
        dataIndex: "order_status",
        key: "order_status"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            {record.order_status === "handled" &&
              moment(new Date()).isAfter(moment(record.finish_time)) && (
                <a onClick={() => this.onAddReviewClick(record)}>Add Review</a>
              )}
          </span>
        )
      }
    ];
    return (
      <div>
        <Table dataSource={orders} columns={columns} />
        <AddReview />
      </div>
    );
  }
}

export default OrdersReview;
