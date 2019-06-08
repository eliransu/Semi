import React, { Component } from "react";
import rootStores from "../../stores";
import AdminPanelStore from "../../stores/AdminPanelStore";
import { observer } from "mobx-react";
import { Table, Divider, Tag } from "antd";
import ViewStore from "../../stores/ViewStore";

const adminPanelStore = rootStores[AdminPanelStore];
const viewStore = rootStores[ViewStore];
@observer
class AdminPanelUsers extends Component {
  removeUser = async id => {
    viewStore.appLoadingBoolean = false;
    adminPanelStore.deleteUserAPI(id);
    try {
      await adminPanelStore.getAllUsersAPI();
    } catch (err) {
      console.log(err);
    } finally {
      viewStore.appLoadingBoolean = true;
    }
  };

  render() {
    const columns = [
      {
        title: "First Name",
        dataIndex: "first_name",
        key: "first_name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Last Name",
        dataIndex: "last_name",
        key: "last_name"
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username"
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Phone",
        dataIndex: "phone_number",
        key: "phone_number"
      },
      {
        title: "Profile Image",
        dataIndex: "profile_image",
        key: "profile_image"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;">Edit {record.name}</a>
            <Divider type="vertical" />
            <a onClick={() => this.removeUser(record._id)}>Delete</a>
          </span>
        )
      }
    ];
    const hide = adminPanelStore.viewUsers ? "" : "hide";
    return (
      <div className={`admin-panel-users ${hide}`}>
        <Table columns={columns} dataSource={adminPanelStore.getAllUsers} />
      </div>
    );
  }
}

export default AdminPanelUsers;
