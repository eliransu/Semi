import React, { Component } from "react";
import { observer } from "mobx-react";
import AdminPanelStore from "../../stores/AdminPanelStore";
import rootStores from "../../stores";
import { Table, Divider, Tag } from "antd";

const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Product Category",
    dataIndex: "category",
    key: "category"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Qualiy",
    dataIndex: "qualiy",
    key: "qualiy"
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
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
        <a href="javascript:;">Edit </a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    name: "Iphone XS MAX",
    category: "Phone",
    description: "very good phone",
    qualiy: "like new",
    owner: "sean asis",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "i-Robot rumba",
    category: "cleaning",
    description: "robot to clean your house",
    qualiy: "used",
    owner: "tom lochi",
    tags: ["nice", "developer"]
  },
  {
    key: "3",
    name: "Macbook Pro",
    category: "computer",
    description: "the best computer in the world",
    qualiy: "new",
    owner: "eliran suesa",
    tags: ["nice", "developer"]
  }
];

const adminPanelStore = rootStores[AdminPanelStore];
@observer
class AdminPanelProducts extends React.Component {
  render() {
    const hide = adminPanelStore.ViewProducts ? "" : "hide";
    return (
      <div className={`admin-panel-product ${hide}`}>
        {" "}
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default AdminPanelProducts;
