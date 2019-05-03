import React, { Component } from 'react'
import Product from './Product';
import {Row,Col} from 'antd';


export class Products extends Component {

    state = {
        products:[
            {productName:'Snow Board',imgURL:'snowboard.jpg',description:'The best SnowBoard in the world'},
            {productName:'Googles',imgURL:'googles.jpeg',description:'best googles ever.'},
            {productName:'Surf board',imgURL:'surf_board.jpg',description:'one of the stick is a little bit broke.'},
            {productName:'Wake board',imgURL:'wake_board.jpeg',description:'new Drill never used.'},
            {productName:'Skate board',imgURL:'skate_board.jpeg',description:'new Drill never used.'},
           
        ]
    }
    
    
    renderAllProducts = ()=>{
      return this.state.products.map((product,index)=>(
          <Col span={8} style={{marginBottom:"3%"}}>
          <Product product={product} key={index}/>
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
