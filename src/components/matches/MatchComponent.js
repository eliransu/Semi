import React, { Component } from "react";
import MatchNode from "./MatchNode";
import { Col, Row } from "antd";
import rootStores from "../../stores";
import MatchesStore from "../../stores/MatchesStore";
import { observer } from "mobx-react";
import ViewStore from "../../stores/ViewStore";
import AlertUtils from "../utils/AlertUtils";

const matchesStore = rootStores[MatchesStore];
const viewStore = rootStores[ViewStore];
@observer
class MatchComponent extends Component {
  componentDidMount() {
    const userName = this.props.match.params.userName;
    console.log({ userName });
    viewStore.setappLoadingBoolean(false);
    matchesStore
      .checkMatching(userName)
      .then(match => {
        if (!match) {
          AlertUtils.infoAlert("You dosen`t have any match");
        } else {
          console.log("match in comp", matchesStore.getMatch);
        }
      })
      .catch(err => {
        AlertUtils.failureAlert(err);
      })
      .finally(() => {
        viewStore.setappLoadingBoolean(true);
      });
  }

  renderAllNodes = () => {
    if (matchesStore.getMatch) {
      return matchesStore.getMatch.map((node, index) => (
        <MatchNode match={node} key={index} history={this.props.history} />
      ));
    }
  };
  render() {
    return <div style={{ textAlign: "center" }}>{this.renderAllNodes()}</div>;
  }
}

export default MatchComponent;

// <Row style={{ marginLeft: "37%" }}>
//   <Col span={8}>
//     <MatchNode user={node.product.owner} count={index} />
//     {index !== matchesStore.getMatch.length - 1 && (
//       <img
//         style={{ width: 100, paddingTop: 15 }}
//         src={require("../../assets/arrow-down-solid.svg")}
//       />
//     )}
//   </Col>
//   <Col span={2}>
//     {index !== matchesStore.getMatch.length - 1 && index !== 0 && (
//       <img
//         style={{ width: 100, paddingTop: 15 }}
//         src={require("../../assets/long-arrow-alt-up-solid.svg")}
//       />
//     )}
//     {index === 0 && (
//       <Row>
//         <img
//           style={{ width: 100, paddingTop: 15 }}
//           src={require("../../assets/arrow-left-solid.svg")}
//         />
//         <img
//           style={{ width: 100, paddingTop: 150 }}
//           src={require("../../assets/long-arrow-alt-up-solid.svg")}
//         />
//       </Row>
//     )}
//   </Col>
//   {index === matchesStore.getMatch.length - 1 && (
//     <Col span={2}>
//       <img
//         style={{ width: 100, paddingTop: 100 }}
//         src={require("../../assets/level-up-alt-solid.svg")}
//       />
//     </Col>
//   )}
// </Row>
