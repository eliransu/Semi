import React from "react"
import { Card } from 'antd';
import FavoriteProducts from "./FavoriteProducts"
import MainHero from "../mainHero/MainHero"

class FavoriteProductsCard extends React.Component {

  render() {
    return (
      <>
      <MainHero />
      <div style={{ background: '#F0F0F0', padding: '30px' }}>
        <Card title=" favorite products" bordered={false}>
          <FavoriteProducts/>
        </Card>
      </div>
      </>
    )
  }
}

export default FavoriteProductsCard