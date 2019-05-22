import React, { Component } from "react";
import rootStores from "../../stores";
import AdminPanelStore from "../../stores/AdminPanelStore";
import { observer } from "mobx-react";
import { Table, Divider, Tag } from "antd";

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
  //   {
  //     title: "Tags",
  //     key: "tags",
  //     dataIndex: "tags",
  //     render: tags => (
  //       <span>
  //         {tags.map(tag => {
  //           let color = tag.length > 5 ? "geekblue" : "green";
  //           if (tag === "loser") {
  //             color = "volcano";
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </span>
  //     )
  //   },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a href="javascript:;">Edit {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    )
  }
];

// const data = [
//   {
//     key: "1",
//     first_name: "tom",
//     last_name: "lochi",
//     username: "tom.lochi",
//     email: "tom.lochi@gmail.com",
//     phone: "123456",
//     profile_image: "abc.jpg",
//     tags: ["nice", "developer"]
//   },
//   {
//     key: "2",
//     first_name: "sean",
//     last_name: "asis",
//     username: "seans",
//     email: "sean.asis@gmail.com",
//     phone: "123456",
//     profile_image: "abc.jpg",
//     tags: ["nice", "cool"]
//   },
//   {
//     key: "3",
//     first_name: "eliran",
//     last_name: "hasin",
//     username: "eliran.hasin",
//     email: "eliran.hasin@gmail.com",
//     phone: "123456",
//     profile_image: "abc.jpg",
//     tags: ["nice", "teacher"]
//   },
//   {
//     key: "4",
//     first_name: "alon",
//     last_name: "bayhmok",
//     username: "alon.brymok",
//     email: "alon.brymok@gmail.com",
//     phone: "123456",
//     profile_image: "abc.jpg",
//     tags: ["loser", "developer"]
//   }
// ];

const adminPanelStore = rootStores[AdminPanelStore];
@observer
class AdminPanelUsers extends Component {
  render() {
    const data = adminPanelStore.getAllUsers;
    console.log("the data is : ", data);
    const hide = adminPanelStore.viewUsers ? "" : "hide";
    return (
      <div className={`admin-panel-users ${hide}`}>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default AdminPanelUsers;
