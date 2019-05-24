import React, { Component } from "react";
import { Card, Icon, Avatar, Rate, Checkbox } from "antd";
import Snownoard from "../../assets/snowboard.jpg";
import ShowMoreText from "react-show-more-text";

const { Meta } = Card;
export class Product extends Component {
  state = {
    opacity: this.props.opacity ? 0.5 : 1,
    productStyle: ""
  };

  onProductClicked = () => {
    this.props.history.replace(`/productPage/${this.props.product._id}`);
  };
  onCheckBoxChanged = e => {
    e.target.checked
      ? this.setState({
          productStyle: '"3px solid lightgreen"'
        })
      : this.setState({ productStyle: "" });
    e.target.checked
      ? this.setState({ opacity: 1 })
      : this.setState({ opacity: 0.5 });
  };

  render() {
    const product = this.props.product;
    const opcity = this.props.marketPlace;
    console.log(this.state.opacity);

    return (
      <div style={{ height: 425 }}>
        {this.state.visible && <div>eliran</div>}
        <Card
          style={{
            width: 300,
            opacity: this.state.opacity,
            border: this.state.productStyle
          }}
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
              {this.props.marketPlace && (
                <Checkbox
                  style={{ marginLeft: 30 }}
                  onChange={e => this.onCheckBoxChanged(e)}
                />
              )}
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
