import React, { Component } from "react";
import rootStores from "../../stores";
import AdminPanelStore from "../../stores/AdminPanelStore";
import { observer } from "mobx-react";
import { Table, Divider, Tag } from "antd";
import ViewStore from "../../stores/ViewStore";

const adminPanelStore = rootStores[AdminPanelStore];
const viewStore = rootStores[ViewStore];
@observer
class AdminPanelOrders extends React.Component {
  removeOrder = async id => {
    viewStore.appLoadingBoolean = false;
    adminPanelStore.deleteOrderAPI(id);
    try {
      await adminPanelStore.getAllOrdersAPI();
    } catch (err) {
      console.log(err);
    } finally {
      viewStore.appLoadingBoolean = true;
    }
  };

  render() {
    const hide = adminPanelStore.viewOrders ? "" : "hide";
    const columns = [
      {
        title: "Product",
        dataIndex: "product.name",
        key: "product.name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Consumer",
        dataIndex: "consumer.username",
        key: "consumer.username"
      },
      {
        title: "Provider",
        dataIndex: "provider.username",
        key: "provider.username"
      },
      {
        title: "Plan period",
        dataIndex: "plan.period",
        key: "plan.period"
      },
      {
        title: "Plan Price",
        dataIndex: "plan.price",
        key: "plan.price"
      },
      {
        title: "Order Status",
        dataIndex: "order_status",
        key: "order_status"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;">Edit {record.name}</a>
            <Divider type="vertical" />
            <a onClick={() => this.removeOrder(record._id)}>Delete</a>
          </span>
        )
      }
    ];

    return (
      <div className={`admin-panel-orders ${hide}`}>
        <Table columns={columns} dataSource={adminPanelStore.getAllOrders} />
      </div>
    );
  }
}

export default AdminPanelOrders;
