import React from "react"
import { Card } from 'antd';
import AddPrduct from "./AddProduct"


class AddProductCard extends React.Component {

  render() {
    return (
      <div style={{ background: '#F0F0F0', padding: '30px' }}>
        <Card title=" Add new product" bordered={false}>
          <AddPrduct/>
        </Card>
      </div>
    )
  }
}

export default AddProductCard