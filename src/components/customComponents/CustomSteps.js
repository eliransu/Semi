import { Steps, Button, message } from "antd";
import React, { Component } from "react";
import AddProductGeneral from "../product/AddProductGeneral";
import AddProductPricing from "../product/AddProductPricing";

import { observer } from "mobx-react";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import AuthStore from "../../stores/AuthStore";
import Product from "../../models/Product";
const Step = Steps.Step;

const steps = [
  {
    title: "General Info"
  },
  {
    title: "Pricing"
  }
];

const productStore = rootStores[ProductStore];
const authStore = rootStores[AuthStore];

@observer
class CustomSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      loading: false
    };
    this.product = new Product();
  }

  onDoneClicked = () => {
    this.setState({ loading: true });
    productStore
      .createProduct(this.product, authStore.getCurrentUser.username)
      .then(res => {
        this.setState({ loading: false });
        this.props.onProductAdded(res);
      });
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onNextClicked = () => {
    this.next();
  };
  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps
          style={{ width: "36%", margin: "auto", paddingBottom: 20 }}
          current={current}
        >
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {current === 0 ? (
            <AddProductGeneral
              onNextClicked={() => this.next()}
              onValidate={this.onValidate}
              product={this.product}
            />
          ) : (
            <AddProductPricing
              product={this.product}
              onDoneClicked={() => this.onDoneClicked()}
              onPrevClicked={() => this.prev()}
            />
          )}
        </div>
      </div>
    );
  }
}

export default CustomSteps;
