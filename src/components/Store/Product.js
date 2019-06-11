import { Avatar, Card, Checkbox, Rate } from "antd";
import React, { Component } from "react";
import ShowMoreText from "react-show-more-text";
import AlertUtils from "../utils/AlertUtils";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import rootStores from "../../stores";

const { Meta } = Card;
const productStore = rootStores[ProductStore];
@observer
class Product extends Component {
  state = {
    opacity: this.props.opacity ? 0.5 : 1,
    productStyle: false
  };

  componentDidMount() {
    productStore.getAvarageScore();
  }

  onProductClicked = () => {
    this.props.history.replace(`/productPage/${this.props.product._id}`);
    window.scrollTo(0, 0);
  };
  onCheckBoxChanged = e => {
    e.preventDefault();
    if (this.props.counter < 5) {
      this.props.onCounterChanged(e.target.checked, this.props.product._id);
      e.target.checked
        ? this.setState({
            productStyle: true
          })
        : this.setState({ productStyle: false });
      e.target.checked
        ? this.setState({ opacity: 1 })
        : this.setState({ opacity: 0.5 });
    } else if (!e.target.checked) {
      this.props.onCounterChanged(e.target.checked, this.props.product._id);
      e.target.checked
        ? this.setState({
            productStyle: true
          })
        : this.setState({ productStyle: false });
      e.target.checked
        ? this.setState({ opacity: 1 })
        : this.setState({ opacity: 0.5 });
    } else {
      AlertUtils.failureAlert("You can choose only 5 products for matching");
    }
  };

  render() {
    const product = this.props.product;
    const avgScore = this.props.starts;
    const opcity = this.props.marketPlace;
    const disabled =
      this.props.checkBoxDisable && !this.state.productStyle ? true : false;

    return (
      <div style={{ maxHeight: 450 }}>
        {this.state.visible && <div>eliran</div>}
        <Card
          className="hvr-bounce-in"
          style={{
            paddingTop: 30,
            marginLeft: "25%",
            width: 320,
            opacity: this.state.opacity,
            boxShadow: "3px 2px 15px -3px rgba(0,0,0,0.5)"
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
                marginLeft: "20%",
                padding: 5,
                cursor: "pointer"
              }}
            />
          }
          actions={[
            <div>
              <Rate disabled defaultValue={avgScore} />
              {this.props.marketPlace && (
                <Checkbox
                  style={{ marginLeft: 30 }}
                  disabled={disabled}
                  onChange={e => this.onCheckBoxChanged(e)}
                />
              )}
            </div>
          ]}
        >
          <Meta
            avatar={
              <Avatar
                src={
                  product && product.owner && product.owner.profile_image
                    ? product.owner.profile_image
                    : require("../../assets/eliran.png")
                }
              />
            }
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
