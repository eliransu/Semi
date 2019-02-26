import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router'
import {
  Route,
  Switch
} from "react-router-dom";
import Home from './Home'
import Carousel from '../mainHero/Carousel'
import UserProfile from '../Store/Store'
import About from '../about/About'
import FavoriteProductsCard from '../product/FavoriteProductsCard'
import AddProductCard from '../product/AddProductCard'
import rootStores from '../../stores';
import BecomeArenter from '../becomeArenter/BecomeArenter'
import agudaImage from '../../assets/aguda.jpg'
import colmanImage from '../../assets/colman.jpg'


const { Header, Content, Footer } = Layout;
const productStore = rootStores['ProductStore'];

class Master extends React.Component {

  handleMenuClicked = path => this.props.history.push(path)

  render() {
    return (
      <Layout className="layout">
        <div className="logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >

          <Menu.Item style={{ fontSize: 16 }} key="1"
            onClick={() => this.handleMenuClicked('')}>
            <Icon fontSize={16} type="home" />
            Home
              </Menu.Item>
          <Menu.Item style={{ fontSize: 16 }} key="2"
            onClick={() => this.handleMenuClicked('products')}>
            <Icon fontSize={16} style={{ marginLeft: 4 }} type="shopping-cart" />
            Products
              </Menu.Item>
          <Menu.Item style={{ fontSize: 16 }} key="3"
            onClick={() => this.handleMenuClicked('become-a-renter')}>
            <Icon fontSize={16} style={{ marginLeft: 4 }} type="notification" />
            Become A Renter!
              </Menu.Item>
              <Menu.Item style={{ fontSize: 16 }} key="4"
            onClick={() => this.handleMenuClicked('add-product-as-renter')}>
            <Icon fontSize={16} style={{ marginLeft: 4 }} type="plus-circle" />
           Add prouct as renter!
              </Menu.Item>
          <Menu.Item style={{ fontSize: 16 }} key="5"
            onClick={() => this.handleMenuClicked('about')}>
            <Icon fontSize={16} style={{ marginLeft: 4 }} type="team" />
            About Us
              </Menu.Item>
        </Menu>
        <Content style={{ padding: '0 50px', backgroundColor: '#fcfcfc' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:userid" component={UserProfile} />
            <Route exact path="/products" component={FavoriteProductsCard} />
            <Route exact path="/add-product-as-renter" component={AddProductCard} />
            <Route exact path="/become-a-renter" component={BecomeArenter}/>
            <Route exact path="/about" component={About} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Semi Designers ©2019 Created by Semi LTD.
          </Footer>
      </Layout>
    )

  }
}

export default withRouter(Master)

