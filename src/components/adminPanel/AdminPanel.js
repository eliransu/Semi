import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import AdminPanelLayout from "./AdminPanelLayout";
import AdminPanelOrders from "./AdminPanelOrders";
import AdminPanelProducts from "./AdminPanelProducts";
import AdminPanelUsers from "./AdminPanelUsers";
import AdminPanelStatistics from "./statistics/AdminPanelStatistics";
export default class AdminPanel extends Component {
  render() {
    return (
      <div className="admin-panel-main-container">
        <AdminPanelLayout />
        <AdminPanelOrders />
        <AdminPanelProducts />
        <AdminPanelUsers />
        <AdminPanelStatistics />
      </div>
    );
  }
}
