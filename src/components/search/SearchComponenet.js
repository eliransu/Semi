import React, { Component } from "react";
import SearchMain from "../mainHero/SearchForMainHero";
import queryString from "query-string";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import { Pagination, Col, Row } from "antd";
import Product from "../Store/Product";
import { toJS } from "mobx";

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
  componentDidUpdate(prevProps, prevState) {
    console.log("in didUpdate");
    if (
      this.props.location.search.length > 0 &&
      prevProps.location != this.props.location
    ) {
      productStore.onProductSearch(this.props.location.search);
    }
  }

  renderAllProducts = () => {
    const products = this.loadBulk(productStore.getSearchResult);

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

        <Row>
          <div className="all-products">{this.renderAllProducts()}</div>
        </Row>
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
