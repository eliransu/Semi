import React from "react";
import { Tabs, Radio, Icon, Col, Row } from "antd";
import "./MainHero.css";
import SearchMain from "./SearchForMainHero";
import { withRouter, matchPath } from "react-router";
import rootStores from "../../stores";
import CategoryStore from "../../stores/CategoryStore";
const TabPane = Tabs.TabPane;

const renderTab = (type, title) => (
  <div>
    <Icon type={type} />
    {title}
  </div>
);

const categoryStore = rootStores[CategoryStore];

class Carousel extends React.Component {
  state = {
    mode: "top"
  };

  renderAllTabs = () => {
    const categories = this.props.categories;
    return categories.map((category, index) => (
      <TabPane
        tab={renderTab(`${category}`, `${category}`)}
        key={`${category}`}
      />
    ));
  };

  onTabClicked = category => {
    console.log({ category });
    this.props.history.push(`/category/${category}`);
  };

  render() {
    const { mode } = this.state;
    return (
      <div style={{ alignContent: "center" }}>
        <Row>
          <Tabs
            className="Tab"
            defaultActiveKey="10"
            tabPosition={mode}
            size="large"
            type="line"
            tabPosition="top"
            onTabClick={this.onTabClicked}
          >
            {this.renderAllTabs()}
          </Tabs>
        </Row>
        <Row style={{ margin: 20 }} type="flex" justify="center">
          <SearchMain history={this.props.history} />
        </Row>
      </div>
    );
  }
}

export default Carousel;
