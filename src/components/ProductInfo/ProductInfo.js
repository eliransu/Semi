import { Avatar, Card, Col, Divider, Rate, Row } from "antd";
import { observer } from "mobx-react";
import React, { Component } from "react";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { contentRenderer } from "../utils/genericComponents";
import { ImageCarousel } from "./ImageCarousel";
import { PeriodsAndPricingsTable } from "./PeriodsAndPricingsTable";
import ProductCalendar from "./ProductCalendar";
import ReviewsList from "./ReviewsList";
import "./ProductInfo.css";
import ViewStore from "../../stores/ViewStore";
import AlertUtils from "../utils/AlertUtils";

const productStore = rootStores[ProductStore];
const viewStore = rootStores[ViewStore];
@observer
class ProductInfo extends Component {
  async componentDidMount() {
    viewStore.setappLoadingBoolean(false);
    try {
      const res = await productStore.getProductById(this.props.match.params.id);
      if (!res) {
        this.setState({ emptyState: true });
      }
      this.setState({ avgScore: productStore.getAvarageScore });
    } catch (err) {
      AlertUtils.failureAlert(err);
    } finally {
      viewStore.setappLoadingBoolean(true);
    }
    productStore.getAvarageScore();
  }

  state = {
    emptyState: false,
    avgScore: 0
  };

  renderProduct = product => {
    const plans = product && product.plans ? product.plans : [];
    const orders = product && product.orders ? product.orders : [];
    const reviews = product && product.reviews ? product.reviews : [];

    return (
      <React.Fragment>
        <div>
          <Row>
            <Col xs={1} sm={3} md={5} lg={7} xl={6}>
              <div style={{ textAlign: "center", paddingTop: "30px" }}>
                <p>Owner:</p>
                <Avatar
                  size="large"
                  src={
                    product && product.owner && product.owner.profile_image
                      ? product.owner.profile_image
                      : require(`../../assets/eliran.png`)
                  }
                  style={{ marginRight: 10 }}
                />
                <a
                  href={`/user/${
                    product && product.owner ? product.owner.username : ""
                  }`}
                >
                  {product && product.owner
                    ? `${product.owner.first_name} ${product.owner.last_name}`
                    : ""}
                </a>
              </div>

              <ImageCarousel
                style={{ width: 300 }}
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
              <ProductCalendar applyOrder={true} width={"1250"} data={orders} />
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
    const product = productStore.getCurrentProduct;
    const avgScore = product && product.avgScore ? product.avgScore : 0;
    const plans = product && product.plans ? product.plans : [];
    const orders = product && product.orders ? product.orders : [];
    const reviews = product && product.reviews ? product.reviews : [];
    const reviewRate = productStore.getavgScore;

    return (
      <React.Fragment>
        {this.state.emptyState ? (
          <div style={{ textAlign: "center" }}>
            <h1>The Product Not Found.</h1>
          </div>
        ) : (
          <React.Fragment>
            <div>
              <Row>
                <Col xs={1} sm={3} md={5} lg={7} xl={6}>
                  <div style={{ textAlign: "center", paddingTop: "30px" }}>
                    <p>Owner:</p>
                    <Avatar
                      size="large"
                      src={
                        product && product.owner && product.owner.profile_image
                          ? product.owner.profile_image
                          : require(`../../assets/eliran.png`)
                      }
                      style={{ marginRight: 10 }}
                    />
                    <a
                      href={`/user/${
                        product && product.owner ? product.owner.username : ""
                      }`}
                    >
                      {product && product.owner
                        ? `${product.owner.first_name} ${
                            product.owner.last_name
                          }`
                        : ""}
                    </a>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {reviewRate && (
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={reviewRate}
                        style={{ textAlign: "center", fontSize: "30px" }}
                      />
                    )}
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
                      {product && product.description
                        ? product.description
                        : ""}
                    </p>
                    <p>
                      Quality:{" "}
                      {product && product.quality ? product.quality : ""}
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
                  style={{
                    background: "rgb(245, 245, 245)",
                    borderRadius: "30px"
                  }}
                >
                  <ProductCalendar data={orders} />
                </Card>

                <Divider />
                <div style={{ textAlign: "center", paddingTop: "30px" }}>
                  {contentRenderer("Reviews:", "", 22)}
                </div>
                <Card
                  style={{
                    background: "rgb(245, 245, 245)",
                    borderRadius: "30px"
                  }}
                >
                  <ReviewsList data={reviews} />
                </Card>

                <div style={{ textAlign: "center", paddingTop: "30px" }} />
              </Row>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ProductInfo;

// {this.state.emptyState
//   ? this.renderEmptyState()
//   : this.renderProduct(productStore.getCurrentProduct)}
