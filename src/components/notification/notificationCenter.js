import React, { Component } from "react";
import { List, Avatar, Drawer, Divider, Col, Row } from "antd";
import Popup from "reactjs-popup";
import OrderDetailsPopUp from "../OrderDetails/OrderDetailsPopUp";
import rootStores from "../../stores";
import AuthStore from "../../stores/AuthStore";
import OrderStore from "../../stores/OrderStore";
import { observer } from "mobx-react";

const authStore = rootStores[AuthStore];
const orderStore = rootStores[OrderStore];

@observer
class notificationCenter extends Component {
  state = {
    open: false
  };

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  render() {
    const currentUser = authStore.getCurrentUser;
    const pStyle = {
      fontSize: 16,
      color: "rgba(0,0,0,0.85)",
      lineHeight: "24px",
      display: "block",
      marginBottom: 16
    };
    const DescriptionItem = ({ title, content }) => (
      <div
        style={{
          fontSize: 14,
          lineHeight: "22px",
          marginBottom: 7,
          color: "rgba(0,0,0,0.65)"
        }}
      >
        <p
          style={{
            marginRight: 8,
            display: "inline-block",
            color: "rgba(0,0,0,0.85)"
          }}
        >
          {title}:
        </p>
        {content}
      </div>
    );

    const newRequestStyle = { background: "#eeeeee" };
    const oldRequestStyle = { background: "white", padding:"2px" };
    return (
      <List
        style={{height: "400px", width:"250px", overflowY:"auto"}}
        itemLayout="horizontal"
        dataSource={orderStore.getAllOrdersAsNotifications}
        renderItem={(item, index) => (
          <>
          <List.Item key={index} style={item.title === "old request" ? oldRequestStyle : newRequestStyle}>
            <List.Item.Meta
              avatar={<Avatar src={item.consumerAvatar} />}
              title={
                <a onClick={this.openModal}>
                  {item.title}
                  <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                    contentStyle={{
                      borderRadius: "20px",
                      width: "auto",
                      position: "absolute",
                      top: "20px",
                      left: "67%",
                      background: "rgb(255, 255, 255)",
                      border: "1px solid rgb(187, 187, 187)",
                      boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px"
                    }}
                  >
                    <div
                      className="modal"
                      style={{
                        display: "flex",
                        flexDirection: "row"
                      }}
                    >
                      <a
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          maxHeight: "18px",
                          marginLeft: "3px",
                          fontSize: "29px"
                        }}
                        onClick={this.closeModal}
                      >
                        &times;
                      </a>
                      <OrderDetailsPopUp
                        closeModal={() => {
                          this.closeModal();
                          this.props.closeModal();
                        }}
                        history={this.props.history}
                        order={orderStore.getOrderById(item.OrderId)}
                      />
                    </div>
                  </Popup>
                </a>
              }
              description={item.consumerName}
            />
          </List.Item>
            <div style={{border:"1px", padding:"2px"}}/>
            </>
        )}
        
      />
    );
  }
}
export default notificationCenter;
