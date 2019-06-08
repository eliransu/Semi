import { Icon, Layout, Menu, Modal, Col } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Popup from "reactjs-popup";
import rootStores from "../../stores";
import AuthStore from "../../stores/AuthStore";
import Login from "../Login/Login";
import ProductInfo from "../ProductInfo/ProductInfo";
import UserProfile from "../Store/Store";
import About from "../about/About";
import BecomeArenter from "../becomeArenter/BecomeArenter";
import RegistrationSuccess from "../becomeArenter/RegistrationSeccuss";
import Category from "../category/Category";
import NotificationCenter from "../notification/notificationCenter";
import PaymentPage from "../paymentPage/PaymentPage";
import AddProductCard from "../product/AddProductCard";
import FavoriteProductsCard from "../product/FavoriteProductsCard";
import Product from "../product/Product";
import Home from "./Home";
import CategoryStore from "../../stores/CategoryStore";
import SearchComponent from "../search/SearchComponenet";
import OrderStore from "../../stores/OrderStore";
import ViewStore from "../../stores/ViewStore";
import SearchComponenet from "../search/SearchComponenet";
import cookies from "cookies";
import MatchingModal from "../matches/MatchingModal";
import MatchesMarket from "../matches/MatchesMarket";
import AlertUtils from "../utils/AlertUtils";
import BlockUi from "react-block-ui";
import AdminPanel from '../adminPanel/AdminPanel'

const semiIcon = require("../../assets/semi.ico");
const { Header, Content, Footer } = Layout;
const authStore = rootStores[AuthStore];
const categoryStore = rootStores[CategoryStore];
const orderStore = rootStores[OrderStore];
const viewStore = rootStores[ViewStore];

@observer
class Master extends React.Component {
  state = {
    visble: false,
    loginVisble: false,
    registerSuccessModal: false,
    user: null,
    open: false,
    matchingModal: false,
    blocking: false
  };

  async componentDidMount() {
    try {
      authStore.tryLogin().then(loggedIn => {
        if (!loggedIn) {
          this.handleMenuClicked("/");
        } else {
          orderStore.loadAllOrders();
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  showModal = () => {
    this.setState({ visble: true });
  };
  handleOk = (e) => {
    //need to send data to the server
    console.log(e);
    this.setState({ visble: false });
  };

  closeModal = () => {
    this.setState({ open: false });
  };
  openModal = () => {
    this.setState({ open: true });
  };

  onMatchingClicked = () => {
    if (!authStore.getCurrentUser) {
      AlertUtils.failureAlert("for matching you must be logged In");
    } else if (authStore.getCurrentUser.products_to_give.length > 0) {
      this.handleMenuClicked("/matching");
    } else {
      this.setState({ matchingModal: true });
    }
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visble: false
    });
  };
  handleMenuClicked = path => this.props.history.push(path);

  toggleBlock = value => {
    this.state({ blocking: value });
  };

  addProductClicked = () => {
    this.setState({ registerSuccessModal: false });
    this.handleMenuClicked("add-product-as-renter");
  };
  onLoginSuccess = user => {
    if (user) {
      this.setState({ user });
    }
  };

  onRegisterSuccess = user => {
    if (user) {
      this.setState({ user, visble: false, registerSuccessModal: true });
    }
  };

  onCancel = () => {
    this.setState({ visble: false });
  };

  returnToHomePage = () => {
    this.setState({ registerSuccessModal: false });
  };

  onLoginSuccess = user => {
    this.setState({ loginVisble: false });
  };
  onLoginCancel = () => {
    this.setState({ loginVisble: false });
  };
  showLoginModal = () => {
    this.setState({ loginVisble: true });
  };

  logOutClicked = async () => {
    await authStore.logOut();
  };

  render() {
    const user = authStore.getCurrentUser;
    return (
      <Layout className="layout">
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{
            lineHeight: "85px",
            padding: "0px 350px 0px 220px"
          }}
        >
          <Col style={{ alignItems: 'center' }} span={6}>
            <Menu.Item
              className="logo"
              onClick={() => {
                this.handleMenuClicked("");
              }}
            >
              <img src={semiIcon} alt="semi"
                onClick={() => this.handleMenuClicked("")}
                style={{ width: 70, cursor: 'pointer' }} />
            </Menu.Item>
          </Col>
          <Menu.Item
            style={{ fontSize: 16 }}
            key="1"
            onClick={() => this.handleMenuClicked("")}
          >
            <Icon fontSize={16} type="home" />
            Home
          </Menu.Item>
          <Menu.Item
            style={{ fontSize: 16 }}
            key="2"
            onClick={() => this.onMatchingClicked()}
          >
            <Icon fontSize={16} type="usergroup-add" />
            Matching
          </Menu.Item>
          <Modal
            visible={this.state.matchingModal}
            onCancel={() => this.setState({ matchingModal: false })}
            footer={null}
            title={
              <div style={{ textAlign: "center", fontSize: 22 }}>Matching</div>
            }
          >
            <MatchingModal
              history={this.props.history}
              closeModal={() => this.setState({ matchingModal: false })}
              user={user}
            />
          </Modal>
          <Menu.Item style={{ fontSize: 16 }} key="3" onClick={this.showModal}>
            <Icon fontSize={16} style={{ marginLeft: 4 }} type="notification" />
            Become A Renter!
          </Menu.Item>
          <Modal
            onCancel={this.onCancel}
            title="Become A Renter"
            visible={this.state.visble}
            footer={null}
          >
            <BecomeArenter
              onCancelClicked={this.onCancel}
              returnToHomePage={() =>
                this.setState({ registerSuccessModal: false })
              }
              onRegistrationSuccess={this.onRegisterSuccess}
            />
          </Modal>
          <Modal
            title="Registration Seccussed"
            visible={this.state.registerSuccessModal}
            footer={null}
          >
            <RegistrationSuccess
              returnToHomePage={this.returnToHomePage}
              onAddProductClicked={this.addProductClicked}
            />
          </Modal>
          {user && (
            <Menu.Item
              style={{ fontSize: 16 }}
              key="4"
              onClick={() => this.handleMenuClicked("add-product-as-renter")}
            >
              <Icon
                fontSize={16}
                style={{ marginLeft: 4 }}
                type="plus-circle"
              />
              Add prouct as renter!
            </Menu.Item>
          )}

          <Menu.Item
            style={{ fontSize: 16 }}
            key="5"
            onClick={() => this.handleMenuClicked("about")}
          >
            <Icon fontSize={16} style={{ marginLeft: 4 }} type="team" />
            About Us
          </Menu.Item>

          {!user && (
            <Menu.Item
              style={{ fontSize: 16 }}
              key="6"
              onClick={() => authStore.toggleviewLoginModal()}
            >
              <Icon fontSize={16} style={{ marginLeft: 4 }} type="login" />
              Log in
            </Menu.Item>
          )}
          {user && (
            <Menu.Item
              style={{ fontSize: 16 }}
              key="7"
              onClick={this.logOutClicked}
            >
              <Icon
                onClick={this.logOutClicked}
                fontSize={16}
                style={{ marginLeft: 4 }}
                type="logout"
              />
              LogOut
            </Menu.Item>
          )}

          {user && (
            <Menu.Item
              style={{ marginLeft: 300, marginBottom: 12 }}
              key="8"
              // onClick={() => this.handleMenuClicked(`/user/${user.username}`)}
            >
              <Popup
                trigger={
                  <Icon
                    type="bell"
                    style={{
                      color: "#e6f7ff",
                      bordeRadius: "42px",
                      border: "1px solid #4995e6ad",
                      background: "#4995e6ad",
                      fontSize: "30px",
                      marginLeft: "10",
                      borderRadius: "30px"
                    }}
                  />
                }
                position="left bottom"
                defaultOpen="true"
                contentStyle={{
                  borderRadius: "20px",
                  position: "absolute",
                  zindex: "2",
                  width: "24px",
                  background: "rgb(255, 255, 255)",
                  border: "1px solid rgb(187, 187, 187)",
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px",
                  padding: "5px",
                  top: "10px !important",
                  left: "-8px !important",
                  height: "30px"
                }}
              >
                <div
                  onClick={this.openModal}
                  style={{
                    position: "absolute",
                    top: "-29px",
                    left: "7px",
                    fontWeight: "bold",
                    color: "#ff8080"
                  }}
                >
                  {orderStore.getLengthOrdersNotHandeledAsProvider}
                </div>
              </Popup>
              <Popup
                open={this.state.open}
                closeOnDocumentClick
                onClose={() => this.closeModal()}
                contentStyle={{
                  borderRadius: "20px",
                  width: "auto",
                  position: "absolute",
                  top: "20px",
                  left: "67%",
                  background: "rgb(255, 255, 255)",
                  border: "1px solid rgb(187, 187, 187)",
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 3px"
                }}
              >
                <div
                  className="modal"
                  style={{ display: "flex", flexDirection: "row" }}
                />
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "center",
                    height: "56px"
                  }}
                >
                  Notification center
                </div>
                <div
                  className="separator--horizontal"
                  style={{
                    borderBottom: "2px solid #F2F2F2",
                    width: "60%",
                    padding: "2px",
                    margin: "auto"
                  }}
                />
                <NotificationCenter closeModal={() => this.closeModal()} />
              </Popup>
            </Menu.Item>
          )}
        </Menu>
        <Login onLoginSuccess={this.onLoginSuccess} />
        <Content style={{ padding: "0 50px", backgroundColor: "#fcfcfc" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:userName" component={UserProfile} />
            <Route exact path="/products" component={Product} />
            <Route
              exact
              path="/products"
              component={FavoriteProductsCard}
            />
            <Route
              exact
              path="/add-product-as-renter"
              component={AddProductCard}
            />
            <Route
              exact
              path="/become-a-renter"
              component={BecomeArenter}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/login"
              history={this.props.history}
              component={Login}
            />
            <Route exact path="/productPage/:id" component={ProductInfo} />
            <Route
              path="/category/:id"
              history={this.props.history}
              component={Category}
            />
            <Route exact path={"/matching"} component={MatchesMarket} />
            <Route exact path="/paymentPage" component={PaymentPage} />
            <Route exact path="/search" component={SearchComponenet} />
            <Route exact path="/adminPanel" component={AdminPanel} />

          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Semi Designers ©2019 Created by Semi LTD.
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(Master);
