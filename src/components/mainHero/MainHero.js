import React from 'react'
import {Row, Col} from 'antd'
import Carousel from './Carousel'

const MainHero = props => {

  return (
    <Row type="flex" justify="center" >
      <Col span={22}>
          <Carousel />
      </Col>
    </Row>
  )

}

export default MainHero