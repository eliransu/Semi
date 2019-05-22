import React, { Component } from "react";

import { Layout, Row, Col, Pagination } from "antd";
import Avatar from "./Avatar";
import { UserDescription } from "./UserDescription";
import Product from "./Product";
import { Products } from "./Products";
import { Reviews } from "./Reviews";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import AuthStore from "../../stores/AuthStore";
const { Header, Footer, Sider, Content } = Layout;

const productStore = rootStores[ProductStore];
const authStore = rootStores[AuthStore];

@observer
class Store extends Component {
  componentDidMount() {
    const userName = this.props.match.params.userName;
    productStore.getProductsByUserName(userName);
  }

  state = {
    page: 1
  };

  loadBulk = products => {
    let bulkProducts = [];
    let start = (this.state.page - 1) * 9;
    let end = this.state.page * 9;
    for (let i = start; i < end && i < products.length; i++) {
      bulkProducts.push(products[i]);
    }
    return bulkProducts;
  };

  renderProducts = () => {
    const products = this.loadBulk(productStore.getAllProducts);
    return products.map((product, index) => (
      <Col span={8} style={{ paddingBottom: 20 }}>
        <Product history={this.props.history} product={product} key={index} />
      </Col>
    ));
  };

  onPageCanged = page => {
    this.setState({ page });
  };
  render() {
    const dataSize = productStore.getAllProducts.length;
    return (
      <React.Fragment>
        <div>
          <div className="main-store-container" style={{ marginBottom: 30 }}>
            <Row style={{ padding: "30px 0px" }}>
              <Col span={6}>
                <UserDescription user={authStore.currentUser} />
              </Col>
              <Col span={18}>
                <Row>
                  <div className="all-products">{this.renderProducts()}</div>
                </Row>
              </Col>
            </Row>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: 25
            }}
          />
        </div>
        <div style={{ textAlign: "center", padding: "20px 0px" }}>
          <Pagination
            defaultCurrent={1}
            total={dataSize}
            pageSize={12}
            onChange={this.onPageCanged}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default Store;
