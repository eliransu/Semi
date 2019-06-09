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
  render() {
    const { count } = this.props;
    const { match } = this.props;
    console.log({ match });
    return (
      //   <div
      //     style={{
      //       paddingLeft: 20
      //     }}
      //   >
      //     <UserDescription isMatch={true} user={this.props.user} />
      //   </div>
      <div>
        <Card>
          <Row>
            <Col span={6}>
              <UserDescription user={match.provider.user} />
            </Col>
            <Col span={3}>
              <img
                style={{ width: 100, paddingTop: 100 }}
                src={require("../../assets/arrow-right-solid.svg")}
              />
            </Col>
            <Col span={6} style={{ paddingRight: 300 }}>
              <Product product={match.product} history={this.props.history} />
            </Col>
            <Col span={3}>
              <img
                style={{ width: 100, paddingTop: 100 }}
                src={require("../../assets/arrow-right-solid.svg")}
              />
            </Col>
            <Col span={6}>
              <UserDescription user={match.consumer.user} />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default MatchNode;
