import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import MainHero from './components/mainHero/MainHero'

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Products</Menu.Item>
          <Menu.Item key="3">Become a Renter !</Menu.Item>
        </Menu>
      </Header>
      <Content style={{padding: '0 50px', backgroundColor: 'white' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <MainHero/>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Semi Designers ©2018 Created by Eliran Suisa
      </Footer>
    </Layout>
    );
  }
}

export default App;
