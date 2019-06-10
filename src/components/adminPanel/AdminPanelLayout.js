import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import AdminPanelStore from "../../stores/AdminPanelStore";
import { observer } from "mobx-react";
import rootStores from "../../stores";
import ViewStore from "../../stores/ViewStore";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const adminPanelStore = rootStores[AdminPanelStore];
const viewStore = rootStores[ViewStore];

@observer
class AdminPanel extends React.Component {
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    adminPanelStore.viewUsers = false;
    adminPanelStore.ViewProducts = false;
    adminPanelStore.viewOrders = false;
  }

  onOrdersClick = async () => {
    viewStore.appLoadingBoolean = false;
    try {
      await adminPanelStore.getAllOrdersAPI();
    } catch (err) {
      console.log(err);
    } finally {
      adminPanelStore.toggleViewOrders();
      viewStore.appLoadingBoolean = true;
    }
  };

  onUsersClick = async () => {
    viewStore.appLoadingBoolean = false;
    try {
      await adminPanelStore.getAllUsersAPI();
    } catch (err) {
      console.log(err);
    } finally {
      viewStore.appLoadingBoolean = true;
      adminPanelStore.toggleViewUsers();
    }
  };

  onProductsClick = async () => {
    viewStore.appLoadingBoolean = false;
    try {
      await adminPanelStore.getAllProductsAPI();
    } catch (err) {
      console.log(err);
    } finally {
      adminPanelStore.toggleViewProducts();
      viewStore.appLoadingBoolean = true;
    }
  };

  onStatisticsClick = () => {
    adminPanelStore.toggleStatistics();
  };

  render() {
    return (
      <div>
        <Layout style={{ minHeight: "200vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" onClick={this.onStatisticsClick}>
                <Icon type="shop" />
                <span>Statistics</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={this.onUsersClick}>
                <Icon type="user" />
                <span>Users</span>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.onProductsClick}>
                <Icon type="desktop" />
                <span>Products</span>
              </Menu.Item>
              <Menu.Item key="4" onClick={this.onOrdersClick}>
                <Icon type="shop" />
                <span>Orders</span>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
      </div>
    );
  }
}

export default AdminPanel;
