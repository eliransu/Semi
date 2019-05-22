import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import AdminPanelStore from "../../stores/AdminPanelStore";
import { observer } from "mobx-react";
import rootStores from "../../stores";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const adminPanelStore = rootStores[AdminPanelStore];

@observer
class AdminPanel extends React.Component {
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  onOrdersClick() {
    adminPanelStore.toggleViewOrders();
  }

  onUsersClick() {
    adminPanelStore.toggleViewUsers();
  }

  onProductsClick() {
    adminPanelStore.toggleViewProducts();
  }

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
              <Menu.Item key="1" onClick={this.onUsersClick}>
                <Icon type="user" />
                <span>Users</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={this.onProductsClick}>
                <Icon type="desktop" />
                <span>Products</span>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.onOrdersClick}>
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
