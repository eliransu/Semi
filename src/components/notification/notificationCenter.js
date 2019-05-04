import React, { Component } from "react";    
import {List, Avatar} from 'antd';
import Popup from "reactjs-popup";


    const data = [
      {
        title: "new order requast"
      },
      {
        title: "new order requast"
      },
      {
        title: "new order requast"
      },
      {
        title: "new order requast"
      }
    ];
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
        return (
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
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
                          <div className="order-details">
                              

                          </div>
                        </div>
                      </Popup>
                    </a>
                  }
                  description="user NAME"
                />
              </List.Item>
            )}
          />
        );
      }
    }
    export default notificationCenter


