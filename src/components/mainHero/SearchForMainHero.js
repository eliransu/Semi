import React from "react";
import { Input, Button, Select, Row, Col, Collapse, Slider } from "antd";

const Search = Input;
const Option = Select.Option;
const Panel = Collapse.Panel;

class SearchMain extends React.Component {
  state = {
    productName: "",
    categoryName: "",
    minPrice: 0,
    maxPrice: 100000,
    disabled: false
  };

  onSearchClicked = value => {
    const categoryName = value;
    this.setState({ categoryName });
  };

  onProductSearchChanged = e => {
    e.preventDefault();
    const productName = e.target.value;
    this.setState({ productName });
  };
  onCategorySelected = value => {
    console.log("category", value);
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
                  />
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    );
  }
}

export default SearchMain