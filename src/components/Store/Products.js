import React, { Component } from 'react'
import Product from './Product';
import {Row,Col} from 'antd';


export class Products extends Component {

    state = {
        products:[
            {productName:'SnowBoard',imgURL:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',description:'The best SnowBoard in the world'},
            {productName:'googles',imgURL:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",description:'best googles ever.'},
            {productName:'wave board',imgURL:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",description:'new board.'},
            {productName:'sking sticks',imgURL:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",description:'one of the stick is a little bit broke.'},
            {productName:'Table',imgURL:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",description:'new Drill never used.'},
            {productName:'drill',imgURL:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",description:'new Drill never used.'},
            {productName:'drill',imgURL:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",description:'new Drill never used.'},
            {productName:'drill',imgURL:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",description:'new Drill never used.'}
    
        ]
    }
    
    renderAllProducts = ()=>{
      return this.state.products.map(product=>(
          <Col span={8} style={{marginBottom:"3%"}}>
          <Product product={product}/>
          </Col> 
      ))       
    }

  render() {
    return (
     <>
     {this.renderAllProducts()}   
    </>
    )
  }
}

export default Products
