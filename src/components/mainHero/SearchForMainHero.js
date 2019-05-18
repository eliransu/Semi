import React from "react";
import { Input, Button, Select, Row, Col, Collapse, Slider } from "antd";
import * as _ from "lodash";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import CategoryStore from "../../stores/CategoryStore";

const Search = Input;
const Option = Select.Option;
const Panel = Collapse.Panel;
const productStore = rootStores[ProductStore];
const categoryStore = rootStores[CategoryStore];
@observer
class SearchMain extends React.Component {
  constructor(props) {
    super(props);
    this.onSliderChanged = _.debounce(this.onSliderChanged, 60000);
  }
  state = {
    productName: "",
    categoryName: "",
    minPrice: 0,
    maxPrice: 100000,
    userName: "",
    quality: "",
    disabled: false
  };

  onSliderChanged = slider => {
    this.setState({ minPrice: slider[0] });
    this.setState({ maxPrice: slider[1] });
  };

  onSearchClicked = () => {
    const {
      productName,
      categoryName,
      maxPrice,
      minPrice,
      quality,
      userName
    } = this.state;
    let query = `/search?`;
    if (categoryName.length > 0) {
      const escapedCategoryName = categoryName.replace("&", "%26");
      query += `categoryName=${escapedCategoryName}`;
    }
    if (productName.length > 0) {
      query += `&&productName=${productName}`;
    }
    if (userName.length > 0) {
      query += `&&userName=${userName}`;
    }
    if (quality.length > 0) {
      query += `&&quality=${quality}`;
    }
    if (minPrice !== 0) {
      query += `&&minPrice=${minPrice}`;
    }
    if (maxPrice !== 100000) {
      query += `&&maxPrice=${maxPrice}`;
    }
    // `/search?category=${categoryName}&product=${productName}&userName=${userName}&quality=${quality}&min=${minPrice}&max=${maxPrice}`
    console.log({ query });
    if (this.props.onSearchClicked) {
      this.props.onSearchClicked(query);
    } else {
      this.props.history.replace(query);
    }
  };

  onProductSearchChanged = e => {
    e.preventDefault();
    const productName = e.target.value;
    this.setState({ productName });
  };
  onCategorySelected = categoryName => {
    this.setState({ categoryName });
  };
  onUserNameChamged = e => {
    e.preventDefault();
    const userName = e.target.value;
    this.setState({ userName });
  };

  onQualityChanged = quality => {
    this.setState({ quality });
  };

  renderOptions = () => {
    return categoryStore.getAllCategories.map((category, index) => (
      <Option size="large" value={`${category}`} key={index}>
        {category}
      </Option>
    ));
  };

  render() {
    const { disabled } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col>
          <Select
            size="large"
            defaultValue="Select"
            style={{ width: 120, marginRight: 10, height: 38 }}
            onSelect={this.onCategorySelected}
          >
            {this.renderOptions()}
          </Select>
          <Search
            style={{ width: 300 }}
            placeholder="Something to rent?"
            enterButton="Search"
            size="large"
            onChange={this.onProductSearchChanged}
          />
          <Button
            size="large"
            style={{ marginLeft: 10, height: 38 }}
            type="primary"
            onClick={this.onSearchClicked}
          >
            Search
          </Button>
          <Collapse bordered={false}>
            <Panel header="Advance Search">
              <Row>
                <Col span={4} style={{ paddingTop: 5 }}>
                  <label>Price Range: </label>
                </Col>
                <Col span={20}>
                  <Slider
                    tooltipVisible
                    max={500}
                    range
                    defaultValue={[20, 150]}
                    disabled={disabled}
                    onChange={this.onSliderChanged}
                  />
                </Col>
              </Row>
              <Row style={{ paddingTop: 7 }}>
                <Col span={4} style={{ paddingTop: 5 }}>
                  <label>User: </label>
                </Col>
                <Col span={20}>
                  <Input
                    placeholder={"user name"}
                    onChange={this.onUserNameChamged}
                  />
                </Col>
              </Row>
              <Row style={{ paddingTop: 25 }}>
                <Col span={4} style={{ paddingTop: 5 }}>
                  <label>Quality: </label>
                </Col>
                <Col span={20}>
                  <Select
                    size="large"
                    defaultValue="Select"
                    style={{ width: 120, marginRight: 10, height: 38 }}
                    onSelect={this.onQualityChanged}
                  >
                    <Option size="large" value="normal">
                      Normal
                    </Option>
                    <Option size="large" value="good">
                      Good
                    </Option>
                    <Option size="large" value="excellent">
                      Excellent
                    </Option>
                  </Select>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    );
  }
}

export default SearchMain;
