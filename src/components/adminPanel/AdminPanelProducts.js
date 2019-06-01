import React, { Component } from "react";
import { observer } from "mobx-react";
import AdminPanelStore from "../../stores/AdminPanelStore";
import rootStores from "../../stores";
import { Table, Divider, Tag } from "antd";
import ViewStore from "../../stores/ViewStore";

const adminPanelStore = rootStores[AdminPanelStore];
debugger
const viewStore = rootStores[ViewStore];

@observer
class AdminPanelProducts extends React.Component {
  removeProduct = async id => {
    viewStore.appLoadingBoolean = false;
    adminPanelStore.deleteProductAPI(id);
    try {
      await adminPanelStore.getAllProductsAPI();
    } catch (err) {
      console.log(err);
    } finally {
      viewStore.appLoadingBoolean = true;
    }
  };

  render() {
    const hide = adminPanelStore.ViewProducts ? "" : "hide";
    const columns = [
      {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Product Category",
        dataIndex: "category.name",
        key: "category.name"
      },
      {
        title: "Qualiy",
        dataIndex: "quality",
        key: "quality"
      },
      {
        title: "Owner",
        dataIndex: "owner.username",
        key: "owner.username"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;">Edit </a>
            <Divider type="vertical" />
            <a onClick={() => this.removeProduct(record._id)}>Delete</a>
          </span>
        )
      }
    ];
    return (
      <div className={`admin-panel-product ${hide}`}>
        <Table columns={columns} dataSource={adminPanelStore.getAllProducts} />
      </div>
    );
  }
}

export default AdminPanelProducts;
