import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import AdminPanelLayout from "./AdminPanelLayout";
import AdminPanelOrders from "./AdminPanelOrders";
import AdminPanelProducts from "./AdminPanelProducts";
import AdminPanelUsers from "./AdminPanelUsers";
export default class AdminPanel extends Component {
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  onclickOrders = () => {
    return <div>aaaaaa</div>;
  };
  render() {
    return (
      <div className="admin-panel-main-container">
        <AdminPanelLayout />
        <AdminPanelOrders />
        <AdminPanelProducts />
        <AdminPanelUsers />
      </div>
    );
  }
}
