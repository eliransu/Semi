import React, { Component } from "react";
import axios from "axios";
import { Col, Pagination, Row } from "antd";
import Product from "../Store/Product";
import rootStores from "../../stores";
import CategoryStore from "../../stores/CategoryStore";
import { observer } from "mobx-react";
import ViewStore from "../../stores/ViewStore";
import { toJS } from "mobx";
import ProductStore from "../../stores/ProductStore";
import AlertUtils from "../utils/AlertUtils";

const categoryStore = rootStores[CategoryStore];
const viewStore = rootStores[ViewStore];
const productStore = rootStores[ProductStore];
@observer
class Category extends Component {
  state = {
    loading: true,
    page: 1
  };

  componentDidMount() {
    viewStore.setappLoadingBoolean(false);
    categoryStore
      .getCategoryById(this.props.match.params.id)
      .then(res => {
        if (res) {
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        AlertUtils.failureAlert(err);
      })
      .finally(() => {
        viewStore.setappLoadingBoolean(true);
      });
  }
  renderAllProducts = () => {
    const products = this.loadBulk(categoryStore.getCurrentCategory);
    return products.map((product, index) => (
      <Col span={8} style={{ padding: 30 }}>
        <Product
          starts={productStore.getAvargeScoreByProduct(product)}
          history={this.props.history}
          product={product}
          key={index}
        />
      </Col>
    ));
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

  render() {
    const category = categoryStore.getCurrentCategory;
    const dataSize = category.length;

    return (
      <React.Fragment>
        <div clasName="category-container">
          <div
            className="header"
            style={{ textAlign: "center", paddingTop: 10 }}
          >
            <h1>{this.props.match.params.id}</h1>
          </div>
          <Row>
            <div className="all-products">{this.renderAllProducts()}</div>
          </Row>
          <div />
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
export default Category;
