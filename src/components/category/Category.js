import React, { Component } from "react";
import axios from "axios";
import { Col } from "antd";
import Product from "../Store/Product";
import rootStores from "../../stores";
import CategoryStore from "../../stores/CategoryStore";
import { observer } from "mobx-react";

const categoryStore = rootStores[CategoryStore];
@observer
class Category extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    console.log("in compo:", this.props.match.params.id);

    categoryStore.getCategoryById(this.props.match.params.id).then(res => {
      if (res) {
        this.setState({ loading: false });
      }
    });
  }
  renderAllProducts = () => {
    return categoryStore.getCurrentCategory.map((product, index) => (
      <Col span={8} style={{ padding: 30 }}>
        <Product history={this.props.history} product={product} key={index} />
      </Col>
    ));
  };

  render() {
    const category = categoryStore.getCurrentCategory;
    console.log("category in render", this.props.match.params.id);
    return (
      <div clasName="category-container">
        <div className="header" style={{ textAlign: "center", paddingTop: 10 }}>
          <h1>{this.props.match.params.id}</h1>
        </div>
        <div className="all-products">{this.renderAllProducts()}</div>
      </div>
    );
  }
}
export default Category;
