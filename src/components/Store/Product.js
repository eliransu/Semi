import React, { Component } from 'react'
import { Card, Icon, Avatar,Rate } from 'antd';

const { Meta } = Card;
export class Product extends Component {

  render() {

    const product = this.props.product;
    return (
        <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={product.imgURL} />}
        actions={[<div><Rate/></div>]}
      >
        <Meta
          avatar={<Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          title={product.productName}
          description="New Snownoard"
        />
      </Card>
    )
  }
}

export default Product
