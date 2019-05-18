import React, { Component } from "react";
import SearchMain from "../mainHero/SearchForMainHero";
import queryString from "query-string";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import { Pagination, Col } from "antd";
import Product from "../Store/Product";
import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants";

const productStore = rootStores[ProductStore];
@observer
class SearchComponenet extends Component {
  state = {
    page: 1
  };
  componentDidMount() {
    if (this.props.location.search.length > 0) {
      productStore.onProductSearch(this.props.location.search);
    }
  }
  componentDidUpdate() {
    if (this.props.location.search.length > 0) {
      productStore.onProductSearch(this.props.location.search);
    }
  }

  renderAllProducts = () => {
    const products = this.loadBulk(productStore.getSearchResult);
    return products.map((product, index) => (
      <Col span={8} style={{ padding: 30 }}>
        <Product history={this.props.history} product={product} key={index} />
      </Col>
    ));
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
  onPageCanged = page => {
    this.setState({ page });
  };
  onSearchClicked = query => {
    this.props.history.replace(query);
    //window.refrsh();
  };

  render() {
    const dataSize = productStore.getSearchResult.length;
    return (
      <div className="search-page-main-container">
        <div className="search-tab" style={{ padding: "35px 0px" }}>
          <SearchMain
            history={this.props.history}
            onSearchClicked={this.onSearchClicked}
          />
        </div>
        <div className="search-result-header" style={{ textAlign: "center" }}>
          <h1 style={{ textDecoration: "underline" }}>Search Result</h1>
        </div>
        <div className="all-products">{this.renderAllProducts()}</div>
        <div
          style={{
            textAlign: "center",
            marginTop: 25
          }}
        >
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

export default SearchComponenet;
