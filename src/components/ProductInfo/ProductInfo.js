import React, { Component } from "react";
import "./ProductInfo.css";
import rootStores from "../../stores";
import { Row, Col, Rate, Card, Avatar, Divider } from "antd";
import { ImageCarousel } from "./ImageCarousel";
import { PeriodsAndPricingsTable } from "./PeriodsAndPricingsTable";
import { contentRenderer } from "../utils/genericComponents";
import { observer } from "mobx-react";
import ReviewsList from "./ReviewsList";
import  ProductCalendar from "./ProductCalendar";
import ProductStore from "../../stores/ProductStore";

const productStore = rootStores[ProductStore];

@observer
class ProductInfo extends Component {
  componentDidMount() {
    productStore.getProductById(this.props.match.params.id).then(res => {
      if (!res) {
        this.setState({ emptyState: true });
      }
    });
  }

  state = {
    emptyState: false
  };

  renderProduct = () => {
    const product = productStore.getCurrentProduct;
    const avgStarsRate = productStore.getAvarageScore;
    const plans = product && product.plans ? product.plans : [];
    const orders = product && product.orders ? product.orders : [];
    const reviews = product && product.reviews ? product.reviews : [];
    console.log({ product });
    return (
      <React.Fragment>
        <div>
          <Row>
            <Col xs={1} sm={3} md={5} lg={7} xl={6}>
              <div style={{ textAlign: "center", paddingTop: "30px" }}>
                <p>Owner:</p>
                <Avatar
                  size="large"
                  src={require(`../../assets/eliran.png`)}
                  style={{ marginRight: 10 }}
                />
                <a href={`/user/eliranh1`}>
                  {product && product.owner
                    ? `${product.owner.first_name} ${product.owner.last_name}`
                    : ""}
                </a>
              </div>
              <div style={{ textAlign: "center" }}>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={avgStarsRate}
                  style={{ textAlign: "center", fontSize: "30px" }}
                />
              </div>
              <ImageCarousel
                imgList={product && product.images ? product.images : []}
              />
            </Col>
            <Col xl={1}>
              <div className="separator--vertical" />
            </Col>
            <Col
              xs={2}
              sm={4}
              md={6}
              lg={8}
              xl={15}
              style={{ paddingTop: "20px" }}
            >
              <div style={{ textAlign: "center", paddingTop: "30px" }}>
                {contentRenderer(
                  product && product.title ? product.title : "",
                  "",
                  22
                )}
              </div>
              <Card
                style={{
                  width: 992,
                  background: "rgb(245, 245, 245)",
                  borderRadius: "30px"
                }}
              >
                <p>
                  Category:{" "}
                  {product && product.category ? product.category.name : ""}
                </p>
                <p>
                  Sub-Category:{" "}
                  {product && product.subCategory
                    ? product.subCategory
                    : "NONE"}
                </p>
                <p>
                  Description:{""}
                  {product && product.description ? product.description : ""}
                </p>
                <p>
                  Quality: {product && product.quality ? product.quality : ""}
                </p>
                <p>
                  Reatail Price (as new):{" "}
                  {product && product.retailPrice ? product.retailPrice : 0}
                </p>
                <p>Time periods / Prices :</p>

                <PeriodsAndPricingsTable data={plans} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Divider />

            <div style={{ textAlign: "center", paddingTop: "30px" }}>
              {contentRenderer("Product Availability:", "", 22)}
            </div>
            <Card
              style={{ background: "rgb(245, 245, 245)", borderRadius: "30px" }}
            >
              <ProductCalendar data={orders} />
            </Card>

            <Divider />
            <div style={{ textAlign: "center", paddingTop: "30px" }}>
              {contentRenderer("Reviews:", "", 22)}
            </div>
            <Card
              style={{ background: "rgb(245, 245, 245)", borderRadius: "30px" }}
            >
              <ReviewsList data={reviews} />
            </Card>

            <div style={{ textAlign: "center", paddingTop: "30px" }} />
          </Row>
        </div>
      </React.Fragment>
    );
  };

  renderEmptyState = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>The Product Not Found.</h1>
      </div>
    );
  };

  render() {
    console.log("current Product", productStore.getCurrentProduct);
    return (
      <React.Fragment>
        {this.state.emptyState ? this.renderEmptyState() : this.renderProduct()}
      </React.Fragment>
    );
  }
}

export default ProductInfo;
