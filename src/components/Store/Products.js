import React, { Component } from 'react'
import Product from './Product';
import {Row,Col} from 'antd';


export class Products extends Component {

    state = {
        products:[
            {productName:'Snow Board',imgURL:'../../assets/snowboard.jpg',description:'The best SnowBoard in the world'},
            {productName:'Googles',imgURL:'../../assets/googles.jpeg',description:'best googles ever.'},
            {productName:'Surf board',imgURL:'../../assets/surf_board.jpg',description:'one of the stick is a little bit broke.'},
            {productName:'Wake board',imgURL:'../../assets/wake_board.jpeg',description:'new Drill never used.'},
            {productName:'Skate board',imgURL:'../../assets/skate_board.jpeg',description:'new Drill never used.'},
           
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
