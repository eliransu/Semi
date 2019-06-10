import React, { Component } from "react";
import { Modal, Icon, Button } from "antd";

export default class AddProductSuccessModal extends Component {
  render() {
    const { onHomePageClicked, onAddOneMoreProductClicked } = this.props;
    return (
      <div className="success-added-product-modal">
        <div className="header" style={{ textAlign: "center" }}>
          <h1>
            Added Product Success!
            <Icon
              style={{ paddingLeft: 7 }}
              type="check-circle"
              theme="twoTone"
              twoToneColor="#52c41a"
            />
          </h1>
        </div>
        <div className="sub-title">
          <h3>Your product added to your store,And now pepole can rent it!</h3>
        </div>
        <div
          className="btn-group"
          style={{ display: "flex", width: "60%", margin: "auto" }}
        >
          <div className="home-page-btn" style={{ paddingRight: 10 }}>
            <Button type="primary" onClick={() => onHomePageClicked()}>
              Home Page
            </Button>
          </div>
          <div className="add-product-btn">
            <Button type="primary" onClick={() => onAddOneMoreProductClicked()}>
              Add Product
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
