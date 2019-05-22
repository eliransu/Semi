import React, { Component } from "react";
import rootStores from "../../stores";
import AdminPanelStore from "../../stores/AdminPanelStore";
import { observer } from "mobx-react";
import { Table, Divider, Tag } from "antd";

const columns = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Consumer",
    dataIndex: "consumer",
    key: "consumer"
  },
  {
    title: "Provider",
    dataIndex: "provider",
    key: "provider"
  },
  {
    title: "Plan",
    dataIndex: "plan",
    key: "plan"
  },
  {
    title: "Order_Status",
    key: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "on-hold") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a href="javascript:;">Edit {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    product: "iphone",
    consumer: "tom",
    provider: "sean",
    plan: "1",
    tags: ["on-hold"]
  },
  {
    key: "2",
    product: "I-robot",
    consumer: "eliran",
    provider: "alon",
    plan: "1",
    tags: ["done"]
  },
  {
    key: "3",
    product: "MacBook Pro",
    consumer: "eliran",
    provider: "sean",
    plan: "1",
    tags: ["done"]
  },
  {
    key: "4",
    product: "Apple TV",
    consumer: "sean",
    provider: "alon",
    plan: "1",
    tags: ["on-hold"]
  }
];

const adminPanelStore = rootStores[AdminPanelStore];
@observer
class AdminPanelOrders extends React.Component {
  render() {
    const hide = adminPanelStore.viewOrders ? "" : "hide";
    return (
      <div className={`admin-panel-orders ${hide}`}>
        {" "}
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default AdminPanelOrders;
