import React, { Component } from "react";
import rootStores from "../../stores";
import { observable } from "mobx";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import Product from "../Store/Product";

const productStore = rootStores[ProductStore];
@observer
class LatestProducts extends Component {
  componentDidMount() {
    productStore.getLatestProduct();
  }
  renderAllProducts = () => {
    const latestProducts = productStore.getLatestProducts;
    return latestProducts.map((product, index) => (
      <div style={{ paddingBottom: 50 }}>
        <Col
          span={8}
          style={{ padding: 15, height: 450, marginTop: 10 }}
          key={index}
        >
          <Product
            starts={productStore.getAvargeScoreByProduct(product)}
            history={this.props.history}
            product={product}
            key={index}
          />
        </Col>
      </div>
    ));
  };
  render() {
    return (
      <Row>
        <div className="all-products">{this.renderAllProducts()}</div>
      </Row>
    );
  }
}

export default LatestProducts;
