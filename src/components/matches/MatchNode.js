import React, { Component } from "react";
import rootStores from "../../stores";
import { observer } from "mobx-react";
import AuthStore from "../../stores/AuthStore";
import { UserDescription } from "../Store/UserDescription";
import { Card, Col, Row } from "antd";
import Product from "../Store/Product";
const authStore = rootStores[AuthStore];
@observer
class MatchNode extends Component {
  componentDidMount() {
    const { match } = this.props;
    const user = authStore.getCurrentUser ? authStore.getCurrentUser : null;

    if (user && match) {
      if (
        user.username === match.provider.user.username ||
        user.username === match.consumer.user.username
      )
        this.setState({ border: true });
    }
  }
  componentDidUpdate() {
    const { match } = this.props;
    const user = authStore.getCurrentUser ? authStore.getCurrentUser : null;
    if (
      user &&
      match &&
      (user.username === match.provider.user.userName ||
        user.username === match.consumer.user.userName)
    ) {
      this.setState({ border: true });
    }
  }
  state = {
    border: false
  };
  render() {
    const { count } = this.props;
    const { match } = this.props;
    console.log({ match });
    return (
      <div>
        <Card style={{ marginTop: 15 }}>
          <Row style={{ margin: "auto" }}>
            <Col span={6}>
              <UserDescription
                user={match.provider.user}
                border={this.state.border}
              />
            </Col>
            <Col span={3}>
              <img
                style={{ width: 100, paddingTop: 100 }}
                src={require("../../assets/arrow-right-solid.svg")}
              />
            </Col>
            <Col span={6} style={{ paddingRight: 100 }}>
              <Product product={match.product} history={this.props.history} />
            </Col>
            <Col span={3}>
              <img
                style={{ width: 100, paddingTop: 100 }}
                src={require("../../assets/arrow-right-solid.svg")}
              />
            </Col>
            <Col span={6}>
              <UserDescription
                user={match.consumer.user}
                border={this.state.border}
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default MatchNode;
