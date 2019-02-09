import React from 'react'
import {Input, Button, Select, Row, Col} from 'antd'

const Search = Input;
const Option = Select.Option;

const SearchMain = props => {
  return (
      <Row type="flex" justify="center">
      <Col span={42} style={{fontWeight: "bold", fontSize: 70, colorAdjust: "black"}}>
        Come Join Us !
      </Col>
      <Col offset={12} span={24}>
      <Select size="large" defaultValue="Choose" style={{ width: 120, marginRight: 10, height: 38 }} onChange={'handleChange'}>
      <Option size="large" value="Tools">Tools</Option>
      <Option size="large" value="Electronics">Electronics</Option>
      <Option size="large" value="Tools">Tools</Option>
    </Select>
    <Search
      style={{width: 300}}
      placeholder="Something to rent?"
      enterButton="Search"
      size="large"
      onSearch={value => console.log(value)}
    />
    <Button size="large" style={{marginLeft: 10, height: 38}} type="primary">Search</Button>
    </Col>
    </Row>
    )
}

export default SearchMain