import React, { Component } from "react";
import { Card, Icon, Avatar, Rate } from "antd";
import Snownoard from "../../assets/snowboard.jpg";
import ShowMoreText from "react-show-more-text";

const { Meta } = Card;
export class Product extends Component {
  state = {};

  onProductClicked = () => {
    this.props.history.replace(`/productPage/${this.props.product._id}`);
  };

  render() {
    const product = this.props.product;

    return (
      <div>
        {this.state.visible && <div>eliran</div>}
        <Card
          style={{ width: "16vw", height: "43vh" }}
          cover={
            <img
              onClick={this.onProductClicked}
              alt={product.name}
              src={
                product && product.images && product.images[0]
                  ? product.images[0]
                  : require(`../../assets/drill.jpg`)
              }
              style={{
                height: "25vh",
                width: "10vw",
                marginLeft: "2.5vw",
                padding: 5,
                cursor: "pointer"
              }}
            />
          }
          actions={[
            <div>
              <Rate />
            </div>
          ]}
        >
          <Meta
            avatar={<Avatar src={require("../../assets/eliran.png")} />}
            title={product.name}
            description={
              <ShowMoreText
                lines={3}
                more="Show more"
                less="Show less"
                onClick={this.onShowMoreClick}
              >
                {product.description}
              </ShowMoreText>
            }
          />
        </Card>
      </div>
    );
  }
}

export default Product;
