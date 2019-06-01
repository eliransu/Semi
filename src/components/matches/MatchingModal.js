import React, { Component } from "react";
import { Select, Button } from "antd";
import rootStores from "../../stores";
import { observer } from "mobx-react";
import ProductStore from "../../stores/ProductStore";
import AlertUtils from "../utils/AlertUtils";
import MatchesStore from "../../stores/MatchesStore";
import { MatchingAction } from "../utils/enums";

const Option = Select.Option;
const productStore = rootStores[ProductStore];
const matchesStore = rootStores[MatchesStore];

@observer
class MatchingModal extends Component {
  async componentDidMount() {
    const userName = this.props.user.username;
    try {
      await productStore.getProductsByUserName(userName);
    } catch (err) {
      AlertUtils.failureAlert(err);
    }
  }

  state = {
    selectedProducts: [],
    loading: false
  };

  renderAllOptions = () => {
    let options = [];
    productStore.getAllProducts.forEach(product => {
      options.push(<Option key={product._id}>{product.name}</Option>);
    });
    return options;
  };

  onSelectedChanged = selectedProducts => {
    if (this.state.selectedProducts.length < 5) {
      this.setState({
        selectedProducts
      });
    } else {
      AlertUtils.failureAlert("max product for Matching is 5");
    }
  };
  onDeselect = deSelected => {
    this.setState({ selectedProducts: deSelected });
  };

  onSendClicked = async () => {
    this.setState({ loading: true });
    if (this.state.selectedProducts.length > 0) {
      console.log("im in send");
      try {
        console.log(this.state.selectedProducts);
        const res = await matchesStore.enterProductsForMatch(
          this.state.selectedProducts,
          MatchingAction.Give
        );
        if (res) {
          this.setState({ loading: false });
          AlertUtils.successAlert("Start Matching");
          this.props.history.replace("/matching");
          this.props.closeModal();
        }
      } catch (err) {}
    } else {
      AlertUtils.failureAlert("You must enter a product");
    }
  };

  render() {
    // const products = productStore.getAllProducts;
    const { user } = this.props;
    return (
      <div>
        <div className="matching-header" style={{ paddingBottom: 30 }}>
          <span>
            We have a great Algorithm are close a cycle by few user and give use
            the products do you want instand products do you want to give, Now
            select your product you want to insert to our Matching market place
          </span>
        </div>
        <Select
          mode="tags"
          placeholder={"Pleace select maximum 5 products"}
          onChange={selected => this.onSelectedChanged(selected)}
          style={{ width: "100%" }}
          onDeselect={deSelected => this.onDeselect(deSelected)}
        >
          {this.renderAllOptions()}
        </Select>
        <div className="btn" style={{ textAlign: "center", padding: 20 }}>
          <Button
            style={{ width: 200 }}
            loading={this.state.loading}
            onClick={this.onSendClicked}
            loading={this.state.loading}
            type={"primary"}
          >
            Send
          </Button>
        </div>
      </div>
    );
  }
}

export default MatchingModal;
