import React, { Component } from "react";
import rootStores from "../../stores";
import { observer } from "mobx-react";
import AuthStore from "../../stores/AuthStore";
import { UserDescription } from "../Store/UserDescription";
const authStore = rootStores[AuthStore];
@observer
class MatchNode extends Component {
  componentDidMount() {
    const { userId } = this.props;
    authStore.getUserDataFromServer("eliranh1");
  }

  render() {
    const userData = authStore.getUserData;
    console.log({ userData });
    return <div>{userData && <UserDescription user={userData.user} />}</div>;
  }
}

export default MatchNode;
