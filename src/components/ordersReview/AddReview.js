import React, { Component } from "react";
import { observer } from "mobx-react";
import { Rate, Form, Icon, Input, Modal, Button } from "antd";
import rootStores from "../../stores";
import OrderStore from "../../stores/OrderStore";
import moment from "moment";
import { toJS } from "mobx";
import AlertUtils from "../utils/AlertUtils";

const orderStore = rootStores[OrderStore];
const { TextArea } = Input;

@observer
class AddReview extends Component {
  showModal = () => {
    orderStore.toggleAddReview();
  };

  handleOk = e => {
    orderStore.toggleAddReview();
  };

  handleCancel = e => {
    orderStore.toggleAddReview();
  };

  writeReview = text => {
    orderStore.reviewData.content = text;
  };

  writeRate = text => {
    orderStore.reviewData.stars = text;
  };

  sendReview = async () => {
    orderStore.reviewData.productId = orderStore.data.product._id;
    orderStore.reviewData.username = orderStore.data.consumer.username;
    orderStore.toggleAddReview();
    try {
      await orderStore.addReviewAPI();
      AlertUtils.successAlert("Review has been post");
    } catch (err) {
      throw err;
    }
  };

  render() {
    return (
      <div>
        <Modal
          className="add-review-modal"
          title="Add Review"
          visible={orderStore.showReview}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
            style={{ display: "flex", flexDirection: "column" }}
            layout="inline"
            onSubmit={this.handleSubmit}
          >
            <div className="add-review-container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Item>
                  {orderStore.data && (
                    <img
                      src={`${orderStore.data.product.images}`}
                      height="200"
                      width="200"
                    />
                  )}
                </Form.Item>
              </div>
              <div className="add-review-text-container">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "7px", width: "99px" }}>
                    Product Name :{" "}
                  </span>
                  <Form.Item>
                    {orderStore.data && (
                      <span className="review-product-name">
                        {orderStore.data.product.name
                          ? orderStore.data.product.name
                          : ""}
                      </span>
                    )}
                  </Form.Item>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "7px" }}>Price : </span>
                  <Form.Item>
                    {orderStore.data && (
                      <span>
                        {orderStore.data.plan.price
                          ? orderStore.data.plan.price
                          : ""}
                      </span>
                    )}
                  </Form.Item>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "7px" }}>Rent From: </span>
                  <Form.Item>
                    {orderStore.data && (
                      <span>
                        {orderStore.data.start_time
                          ? moment(orderStore.data.start_time).format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                      </span>
                    )}
                  </Form.Item>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "7px" }}>Rent Till: </span>
                  <Form.Item>
                    {orderStore.data && (
                      <span>
                        {orderStore.data.finish_time
                          ? moment(orderStore.data.finish_time).format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                      </span>
                    )}
                  </Form.Item>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <Form.Item>
                    <span style={{ marginRight: "7px" }}>Review Content: </span>
                  </Form.Item>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <Form.Item>
                    <TextArea
                      className="add-review-text-area"
                      rows={4}
                      onChange={e => this.writeReview(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item>
                    <Rate onChange={value => this.writeRate(value)} />
                  </Form.Item>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    direction: "rtl"
                  }}
                >
                  <Form.Item>
                    <Button
                      className="add-review-send-button"
                      htmlType="submit"
                      type="primary"
                      onClick={() => this.sendReview()}
                    >
                      Send
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}

const AddReviewForm = Form.create({ name: "reviewForm" })(AddReview);
export default AddReviewForm;
