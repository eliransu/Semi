import React, { Component } from "react";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import { Col, Row, Pagination, Alert } from "antd";
import Product from "../Store/Product";
import AlertUtils from "../utils/AlertUtils";
const productStore = rootStores[ProductStore];
@observer
class MatchesMarket extends Component {
  async componentDidMount() {
    const userName = productStore.authStore.getCurrentUser
      ? productStore.authStore.getCurrentUser.username
      : null;
    try {
      if (userName) {
        await productStore.getProductsByUserName(userName);
      }
    } catch (err) {
      AlertUtils.failureAlert(err);
    }
  }

  state = {
    page: 1
  };

  onPageCanged = page => {
    this.setState({ page });
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

  renderAllProducts = () => {
    const products = this.loadBulk(productStore.getAllProducts);
    return products.map((product, index) => (
      <Col span={8} style={{ padding: 30 }}>
        <Product
          history={this.props.history}
          product={product}
          key={index}
          marketPlace={true}
          opacity={true}
        />
      </Col>
    ));
  };
  render() {
    const products = productStore.getAllProducts;
    const dataSize = products.length;
    return (
      <div>
        <div style={{ textAlign: "center", padding: "20px 0px" }}>
          <h1 style={{ textDecoration: "underline" }}>Matching Market Place</h1>
        </div>
        <Row>
          <div className="all-products">{this.renderAllProducts()}</div>
        </Row>
        <div />
        <div style={{ textAlign: "center", padding: "20px 0px" }}>
          <Pagination
            defaultCurrent={1}
            total={dataSize}
            pageSize={12}
            onChange={this.onPageCanged}
          />
        </div>
      </div>
    );
  }
}
export default MatchesMarket;
