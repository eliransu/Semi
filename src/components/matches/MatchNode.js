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
    const { count } = this.props;
    return (
      <div
        style={{
          paddingTop: count % 2 === 0 && count !== 0 ? 150 : 40,
          paddingLeft: 20
        }}
      >
        {userData && <UserDescription isMatch={true} user={userData.user} />}
      </div>
    );
  }
}

export default MatchNode;
