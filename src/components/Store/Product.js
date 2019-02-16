import React, { Component } from 'react'
import { Card, Icon, Avatar,Rate } from 'antd';
import Snownoard from '../../assets/snowboard.jpg';


const { Meta } = Card;
export class Product extends Component {
  
  state = {
  }

  render() {

    const product = this.props.product;
 
    return (
      <React.Fragment>
      {this.state.visible && <div>eliran</div> }
        <Card
        style={{ width: 300 }}
        cover={<img alt="example" src={require('../../assets/snowboard.jpg')}   />}
        actions={[<div><Rate/></div>]}
      >
        <Meta
          avatar={<Avatar src={require('../../assets/eliran.png')} />}
          title={product.productName}
          description="New Snownoard"
        />
      </Card>
      </React.Fragment>
    )
  }
}

export default Product
