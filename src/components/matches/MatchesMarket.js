import React, { Component } from "react";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import { Col, Row, Pagination, Button } from "antd";
import Product from "../Store/Product";
import AlertUtils from "../utils/AlertUtils";
import MatchesStore from "../../stores/MatchesStore";
import ViewStore from "../../stores/ViewStore";
import { MatchingAction } from "../utils/enums";
import BlockUi from "react-block-ui";
const productStore = rootStores[ProductStore];
const matchesStore = rootStores[MatchesStore];
@observer
class MatchesMarket extends Component {
  async componentDidMount() {
    const userName = productStore.authStore.getCurrentUser
      ? productStore.authStore.getCurrentUser.username
      : null;
    console.log({ userName });
    try {
      if (userName) {
        await productStore.getProductsByUserName(userName);
      }
    } catch (err) {
      AlertUtils.failureAlert(err);
    }
  }

  state = {
    page: 1,
    counter: 0,
    productsToTake: []
  };

  onPageCanged = page => {
    this.setState({ page });
  };

  onMatchingClicked = async () => {
    try {
      const result = await matchesStore.enterProductsForMatch(
        this.state.productsToTake,
        MatchingAction.Take
      );
      AlertUtils.successAlert(
        "The Algorithm start and work for you",
        "we will notice you when we find a matching for you"
      );
      this.props.history.replace("/");
    } catch (err) {
      AlertUtils.failureAlert(err);
    }
  };

  setCount = (value, productId) => {
    let counter = value ? this.state.counter + 1 : this.state.counter - 1;
    this.setState({ counter });
    if (value) {
      this.state.productsToTake.push(productId);
    } else {
      const filtered = this.state.productsToTake.filter(product => {
        console.log(product, productId);
        return product != productId;
      });
      console.log({ filtered });
      this.setState({ productsToTake: filtered }, () => {
        console.log(this.state.productsToTake);
      });
    }
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
    const disable = this.state.counter > 4 ? true : false;
    const products = this.loadBulk(productStore.getAllProducts);
    return products.map((product, index) => (
      <Col span={8} style={{ padding: 30 }}>
        <Product
          history={this.props.history}
          product={product}
          key={index}
          marketPlace={true}
          opacity={true}
          onCounterChanged={this.setCount}
          counter={this.state.counter}
          checkBoxDisable={disable}
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
        <div style={{ textAlign: "center", paddingBottom: 25 }}>
          <Button
            style={{ width: 200 }}
            type="primary"
            disable={this.state.counter === 0 ? true : false}
            onClick={() => this.onMatchingClicked()}
          >{`Matching (${this.state.counter})`}</Button>
        </div>

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
