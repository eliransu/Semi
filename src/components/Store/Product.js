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
      <div style={{height:425}}>
      {this.state.visible && <div>eliran</div> }
        <Card
        style={{ width: 300 }}
          cover={<img alt={product.name} src={require(`../../assets/${product.image}`)} style={{height:300}}   />}
        actions={[<div><Rate/></div>]}
      >
        <Meta
          avatar={<Avatar src={require('../../assets/eliran.png')} />}
          title={product.name}
          description={product.description}
     />
      </Card>
      </div>
    )
  }
}

export default Product
