import React from 'react'
import { Tabs, Radio, Icon, Col, Row } from 'antd';
import './MainHero.css'
import SearchMain from './SearchForMainHero'
import { withRouter, matchPath } from 'react-router'
import rootStores from '../../stores';
import CategoryStore from '../../stores/CategoryStore';
const TabPane = Tabs.TabPane;

const renderTab = (type, title) => <div><Icon type={type}></Icon>{title}</div>

const categoryStore = rootStores[CategoryStore];

class Carousel extends React.Component {
  state = {
    mode: 'top',
  };

  onTabClicked =(category)=>{  

this.props.history.push(`/category/${category}`)
  }

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
  
            onTabClick={this.onTabClicked}
          >
            <TabPane tab={renderTab('tool', 'Tools')} key="tools" />
            <TabPane tab={renderTab('thunderbolt', 'Electronics')} key="electronics" />
            <TabPane tab={renderTab('home', 'Home & Garden')} key="home&garden"  />
            <TabPane tab={renderTab('rocket', 'Games')} key="games"  />
            <TabPane tab={renderTab('skin', 'Clothes')} key="clothes" />
          </Tabs>
        </Row>
        <Row style={{ margin: 20 }} type="flex" justify="center" >
          <SearchMain />
        </Row>
      </div>
    );
  }
}

export default Carousel