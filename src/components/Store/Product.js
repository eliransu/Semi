import React, { Component } from "react";
import { Card, Icon, Avatar, Rate } from "antd";
import Snownoard from "../../assets/snowboard.jpg";
import ShowMoreText from "react-show-more-text";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";

const { Meta } = Card;

const productStore = rootStores[ProductStore];

export class Product extends Component {
  state = {};

  onProductClicked = () => {
    this.props.history.replace(`/productPage/${this.props.product._id}`);

  };

  render() {
    const product = this.props.product;

    return (
      <div style={{ height: 425 }}>
        {this.state.visible && <div>eliran</div>}
        <Card
          style={{ width: 300 }}
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
                marginLeft: "4.5vw",
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
