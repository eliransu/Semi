import React, { Component } from "react";
import rootStores from "../../stores";
import { observable } from "mobx";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import { Col } from "antd";
import Product from "../Store/Product";

const productStore = rootStores["ProductStore"];
@observer
class LatestProducts extends Component {
  componentDidMount() {
    productStore.getLatestProduct(10);
  }
  renderAllProducts = () => {
    const latestProducts = productStore.getLatestProducts;
    return latestProducts.map((product, index) => (
      <Col span={8} style={{ marginBottom: "3%" }}>
        <Product history={this.props.history} product={product} key={index} />
      </Col>
    ));
  };
  render() {
    console.log(productStore.getLatestProducts);
    return <>{this.renderAllProducts()}</>;
  }
}

export default LatestProducts;
