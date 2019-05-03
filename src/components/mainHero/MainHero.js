import React from 'react'
import { Row, Col } from 'antd'
import Carousel from './Carousel'
import Img from 'react-image'
const GREY = "#9E9E9E";

const styles = {
};



 
const MainHero = props => {


  return (
    <Row style={{ paddingTop: 15 }} type="flex" justify="center">
      <Col>
        <img style={{ ...styles, marginBottom: 7, borderRadius: 25 }} src="https://i.ibb.co/tbVSMtZ/main.png" alt="hero"></img>
      </Col>
      <Col span={14}>
        <Carousel history={props.history} />
      </Col>
    </Row >
  )

}

export default MainHero