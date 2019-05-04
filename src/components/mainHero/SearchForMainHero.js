import React from "react";
import { Input, Button, Select, Row, Col } from "antd";

const Search = Input;
const Option = Select.Option;

class SearchMain extends React.Component {
  onSearchClicked = value => {
    console.log("clicked");
    console.log(value);
  };
  render() {
    return (
      <Row type="flex" justify="center">
        <Col>
          <Select
            size="large"
            defaultValue="Select"
            style={{ width: 120, marginRight: 10, height: 38 }}
            onChange={"handleChange"}
          >
            <Option size="large" value="Tools">
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
            onSearch={this.onSearchClicked}
          />
          <Button
            size="large"
            style={{ marginLeft: 10, height: 38 }}
            type="primary"
          >
            Search
          </Button>
        </Col>
      </Row>
    );
  }
}

export default SearchMain;
