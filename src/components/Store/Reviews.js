import React, { Component } from "react";
import Review from "./Review";
import {
  Carousel,
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Rate
} from "antd";

const TextArea = Input.TextArea;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Review
      </Button>
    </Form.Item>
  </div>
);
export class Reviews extends Component {
  state = {
    submitting: false,
    value: "",
    commentRate: 0,
    reviews: [
      {
        content: "the best seller in the world",
        value: 3,
        name: "Eliran Suissa"
      },
      {
        content: "you need to do that much better.",
        value: 4,
        name: "Eliran Hasin"
      },
      {
        content: "The best proudcts I ever rent, You are The best!!",
        value: 5,
        name: "Sean Assis"
      }
    ]
  };

  handleSubmit = () => {
    const { value } = this.state;
    if (!this.state.value) {
      return;
    }
    const review = {
      content: this.state.value,
      value: this.state.commentRate,
      name: "Eliran :)" //here when we will have a server side we can take the name from user store.
    };
    this.setState(prevState => ({
      reviews: [...prevState.reviews, review]
    }));
    this.setState({ value: "" });
  };

  handleChange = e => {
    const newReview = e.target.value;
    this.setState({ value: newReview });
  };

  renderReviews = () => {
    return this.state.reviews.map(review => (
      <div>
        <Review review={review} />
      </div>
    ));
  };
  commentRateChanged = value => {
    this.setState({ commentRate: value });
    console.log(value);
  };
  render() {
    const { comments, submitting, value, commentRate } = this.state;
    return (
      <div>
        <div className="header-store" />
        <div className="review-carusel">
          <Carousel autoplay>{this.renderReviews()}</Carousel>
        </div>
        <div className="comment-area-container">
          <Editor
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            submitting={submitting}
            value={value}
            style={{ width: "60%", margin: "auto" }}
          />
          <Rate
            defaultValue={3}
            value={commentRate}
            onChange={this.commentRateChanged}
          />
        </div>
      </div>
    );
  }
}

export default Reviews;
