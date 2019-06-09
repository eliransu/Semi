import { Col, Row, Tabs, Divider, Transfer } from "antd";
import { observer } from "mobx-react";
import React, { Component } from "react";
import rootStores from "../../stores";
import AuthStore from "../../stores/AuthStore";
import Product from "../Store/Product";

const authStore = rootStores[AuthStore];
@observer
class MatchingStoreComponent extends Component {
  componentDidMount() {
    const userName = this.props.match.params.username;
    //need end-point to take specific user.
    if (
      authStore.getCurrentUser &&
      userName === authStore.getCurrentUser.username
    ) {
      this.setState({ owner: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const userName = this.props.match.params.username;

    if (!prevState.targetToGiveKeys.length) {
      this.setState({
        targetToGiveKeys: authStore.getCurrentUser.products_to_give
      });
      if (
        authStore.getCurrentUser &&
        authStore.getCurrentUser.username === userName
      ) {
        this.setState({ owner: true });
      }
    }
  }

  state = {
    owner: false,
    targetToGiveKeys: authStore.getCurrentUser
      ? authStore.getCurrentUser.products_to_give
      : [],
    selectedToGive: []
  };

  renderProductToTake = () => {
    const user = authStore.getCurrentUser;
    if (user && user.products_to_give && user.products_to_give.length) {
      return user.products_to_give.map((product, index) => (
        <Col span={8} style={{ marginBottom: "3%" }}>
          <Product history={this.props.history} product={product} key={index} />
        </Col>
      ));
    } else {
      return null;
    }
  };

  renderProductsToStore = productToRender => {
    const user = authStore.getCurrentUser;
    if (user && productToRender && productToRender.length) {
      return productToRender.map((product, index) => (
        <Col span={8}>
          <Product history={this.props.history} product={product} key={index} />
        </Col>
      ));
    } else {
      return null;
    }
  };

  onTransferToGive = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetToGiveKeys: nextTargetKeys });
    console.log("targetKeys: ", nextTargetKeys);
    console.log("direction: ", direction);
    console.log("moveKeys: ", moveKeys);
  };

  onProductToGiveSelected = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedToGive: [...sourceSelectedKeys, ...targetSelectedKeys]
    });
    console.log({ sourceSelectedKeys });
    console.log({ targetSelectedKeys });
  };
  handleScroll = (direction, e) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  render() {
    const user = authStore.getCurrentUser;
    console.log({ user });
    const allUserProductsAsProvider = user ? user.products_for_rent : [];
    const { owner, targetToGiveKeys, selectedToGive } = this.state;
    console.log({ targetToGiveKeys });
    const transferStyle = {
      paddingLeft: 30
    };
    console.log({ owner });
    return (
      <div>
        <Row>
          {owner && (
            <Col span={4}>
              <h3
                style={{
                  textDecoration: "underline",
                  paddingLeft: 44,
                  paddingTop: 120
                }}
              >
                Product To Give:
              </h3>
              <Transfer
                style={transferStyle}
                dataSource={allUserProductsAsProvider}
                titles={["Source", "Target"]}
                targetKeys={targetToGiveKeys}
                selectedKeys={selectedToGive}
                onChange={this.onTransferToGive}
                onSelectChange={this.handleSelectChange}
                onScroll={this.handleScroll}
                render={item => item.value}
              />
              <div style={{ padding: "420px 0px 0px 44px" }}>
                <h3 style={{ textDecoration: "underline" }}>
                  Product To Take:
                </h3>
              </div>
              <Transfer
                style={{ ...transferStyle }}
                dataSource={allUserProductsAsProvider}
                titles={["Source", "Target"]}
                targetKeys={targetToGiveKeys}
                selectedKeys={selectedToGive}
                onChange={this.onTransferToGive}
                onSelectChange={this.handleSelectChange}
                onScroll={this.handleScroll}
                render={item => item.value}
              />
            </Col>
          )}
          <Col span={20}>
            <div style={{ textAlign: "center", paddingTop: 30 }}>
              <h1>{`Wellcome To ${
                user ? user.first_name : ""
              } Matching Store`}</h1>
            </div>
            <Row>
              <div style={{ padding: "30px 0px 20px 15px" }} />
              <div style={{ textAlign: "center" }}>
                {user
                  ? this.renderProductsToStore(user.products_to_give)
                  : null}
              </div>
            </Row>
            <Divider />
            <Row>
              <div style={{ textAlign: "center" }}>
                {user
                  ? this.renderProductsToStore(user.products_to_take)
                  : null}
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MatchingStoreComponent;
