import React from "react";
import { Input, Button, Select, Row, Col, Collapse, Slider } from "antd";
import * as _ from "lodash";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";

const Search = Input;
const Option = Select.Option;
const Panel = Collapse.Panel;
const productStore = rootStores[ProductStore];
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
    console.log("here");
    productStore.onProductSearch(this.state);
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
            <Option size="large" value="tools">
              Tools
            </Option>
            <Option size="large" value="electronics">
              Electronics
            </Option>
            <Option size="large" value="home&garden">
              Home&Garden
            </Option>
            <Option size="large" value="sport">
              Sport
            </Option>
            <Option size="large" value="clothes">
              Clothes
            </Option>
            <Option size="large" value="games">
              Games
            </Option>
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
