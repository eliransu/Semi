import React from 'react'
import { Tabs, Radio, Icon, Col, Row } from 'antd';
import './MainHero.css'
import SearchMain from './SearchForMainHero'
import { withRouter, matchPath } from 'react-router'
const TabPane = Tabs.TabPane;

const renderTab = (type, title) => <div><Icon type={type}></Icon>{title}</div>
class Carousel extends React.Component {
  state = {
    mode: 'top',
  };


  render() {
    const { mode } = this.state;
    return (
      <div style={{ alignContent: "center" }}>
        <Row>
          <Tabs className="Tab"
            defaultActiveKey="10"
            tabPosition={mode}
            size="large"
            type="line"
            tabPosition="top"
          >
            <TabPane tab={renderTab('tool', 'Tools')} key="1" />
            <TabPane tab={renderTab('thunderbolt', 'Electronics')} key="2" />
            <TabPane tab={renderTab('home', 'Home & Garden')} key="3" />
            <TabPane tab={renderTab('rocket', 'Games')} key="4" />
            <TabPane tab={renderTab('car', 'Vehicles')} key="5" />
            <TabPane tab={renderTab('skin', 'Clothes')} key="6" />
            <TabPane tab={renderTab('tool', 'Tools')} key="7" />
            <TabPane tab={renderTab('thunderbolt', 'Electronics')} key="8" />
            <TabPane tab={renderTab('home', 'Home & Garden')} key="9" />
            <TabPane tab={renderTab('rocket', 'Games')} key="10" />
            <TabPane tab={renderTab('car', 'Vehicles')} key="11" />
            <TabPane tab={renderTab('skin', 'Clothes')} key="12" />
          </Tabs>
        </Row>
        <Row style={{ marginBottom: 7 }} type="flex" justify="center" >
          <SearchMain />
        </Row>
      </div>
    );
  }
}

export default Carousel