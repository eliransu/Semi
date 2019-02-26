import React, { Component } from 'react'
import Product from '../product/Product';
import {Row,Col} from 'antd';
import "./FavoriteProducts.css";
import MainHero from '../mainHero/MainHero'

export class FavoriteProducts extends Component {


  render() {
    return (
         <>
     
     <div className = "product-item-container">
           <div className="product-item">
                <Product/>
           </div>
           <div className="product-item">
                <Product/>
           </div>
           <div className="product-item">
                <Product/>
           </div>
           <div className="product-item">
                <Product/>
           </div>
           <div className="product-item">
                <Product/>
           </div>
           <div className="product-item">
           <Product/>
           </div>
           <div className="product-item">
                <Product/>
           </div>
           <div className="product-item">
                 <Product/>
           </div>
           <div className="product-item">
                 <Product/>
           </div>
       </div>
</>
    )
  }
}

export default FavoriteProducts
