import React, { Component } from "react";

import { Layout, Row, Col } from "antd";
import Avatar from "./Avatar";
import { UserDescription } from "./UserDescription";
import Product from "./Product";
import { Products } from "./Products";
import { Reviews } from "./Reviews";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
const { Header, Footer, Sider, Content } = Layout;

const productStore = rootStores["ProductStore"];

export class Store extends Component {
  componentDidMount() {
    const userName = this.props.match.params.userName;
    productStore.getProductsByUserName(userName);
  }
  render() {
    return (
      <div className="main-store-container">
        <Row>
          <Col span={12}>
            {""}
            <UserDescription />
          </Col>
          <Col span={10}>
            <Reviews />
          </Col>
        </Row>
        <div className="all-products">
          <Products />
        </div>
      </div>
    );
  }
}
export default Store;
