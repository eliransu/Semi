import React from 'react'
import { Input, Button, Select, Row, Col } from 'antd'

const Search = Input;
const Option = Select.Option;

const SearchMain = props => {
  return (
    <Row type="flex" justify="center">
      <Col>
        <Select size="large" defaultValue="Select" style={{ width: 120, marginRight: 10, height: 38 }} onChange={'handleChange'}>
          <Option size="large" value="Tools">Tools</Option>
          <Option size="large" value="Electronics">Electronics</Option>
          <Option size="large" value="Home">Home</Option>
        </Select>
        <Search
          style={{ width: 300 }}
          placeholder="Something to rent?"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />
        <Button size="large" style={{ marginLeft: 10, height: 38 }} type="primary">Search</Button>
      </Col>
    </Row >
  )
}

export default SearchMain