import { Col, Icon, Layout, Menu, Modal, Badge, Avatar } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Popup from "reactjs-popup";
import rootStores from "../../stores";
import AuthStore from "../../stores/AuthStore";
import CategoryStore from "../../stores/CategoryStore";
import OrderStore from "../../stores/OrderStore";
import ViewStore from "../../stores/ViewStore";
import Login from "../Login/Login";
import ProductInfo from "../ProductInfo/ProductInfo";
import UserProfile from "../Store/Store";
import About from "../about/About";
import AdminPanel from "../adminPanel/AdminPanel";
import BecomeArenter from "../becomeArenter/BecomeArenter";
import RegistrationSuccess from "../becomeArenter/RegistrationSeccuss";
import Category from "../category/Category";
import MatchesMarket from "../matches/MatchesMarket";
import MatchingModal from "../matches/MatchingModal";
import NotificationCenter from "../notification/notificationCenter";
import PaymentPage from "../paymentPage/PaymentPage";
import AddProductCard from "../product/AddProductCard";
import FavoriteProductsCard from "../product/FavoriteProductsCard";
import Product from "../product/Product";
import SearchComponenet from "../search/SearchComponenet";
import AlertUtils from "../utils/AlertUtils";
import Home from "./Home";
import MatchingStoreComponent from "../matches/MatchingStoreComponent";
import MenuItem from "antd/lib/menu/MenuItem";
import MatchComponent from "../matches/MatchComponent";
const semiIcon = require("../../assets/semi.ico");
const { Header, Content, Footer } = Layout;
const authStore = rootStores[AuthStore];
const categoryStore = rootStores[CategoryStore];
const orderStore = rootStores[OrderStore];
const viewStore = rootStores[ViewStore];
const { SubMenu } = Menu;

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
  handleOk = e => {
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
      this.handleMenuClicked(`/matching/${authStore.getCurrentUser._id}`);
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
    const logOut = await authStore.logOut();
    if (logOut) {
      this.handleMenuClicked("/");
    }
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
            padding: "0px 20px",
            textAlign: "center"
          }}
        >
          <Col span={2}>
            <Menu.Item
              className="logo"
              onClick={() => {
                this.handleMenuClicked("");
              }}
            >
              <img
                src={semiIcon}
                alt="semi"
                onClick={() => this.handleMenuClicked("")}
                style={{ width: 70, cursor: "pointer" }}
              />
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
              onClick={() => this.handleMenuClicked("/add-product-as-renter")}
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
            onClick={() => this.handleMenuClicked("/about")}
          >
            <Icon fontSize={16} style={{ marginLeft: 4 }} type="team" />
            About Us
          </Menu.Item>
          {user && (
            <Menu.Item
              style={{ fontSize: 16 }}
              key="9"
              onClick={() => console.log("blabla")}
            >
              <Icon fontSize={16} style={{ marginLeft: 4 }} type="book" />
              My Orders
            </Menu.Item>
          )}

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
            <SubMenu
              style={{ marginLeft: 240, paddingTop: 10 }}
              key="8"
              // onClick={() => this.handleMenuClicked(`/user/${user.username}`)}
              title={
                <span style={{ marginRight: 24 }}>
                  <Badge
                    count={orderStore.getLengthOrdersNotHandeledAsProvider}
                    // onClick={() => this.openModal()}
                  >
                    <Avatar
                      style={{ borderRadius: 20 }}
                      shape="square"
                      icon="user"
                      src={
                        user.profile_image
                          ? user.profile_image
                          : require("../../assets/eliran.png")
                      }
                    />
                  </Badge>
                </span>
              }
            >
              <Menu.Item key="11" onClick={() => this.openModal()}>
                <Icon type="bell" />
                Notification
              </Menu.Item>
              <Menu.Item
                key="13"
                onClick={() => this.handleMenuClicked(`/user/${user.username}`)}
              >
                <Icon fontSize={16} style={{ marginLeft: 4 }} type="star" />
                My Store
              </Menu.Item>

              {user && user.products_to_give && user.products_to_give.length && (
                <Menu.Item
                  key="14"
                  onClick={() =>
                    this.handleMenuClicked(
                      `/users/matching/match/${user.username}`
                    )
                  }
                >
                  <Icon style={{ marginLeft: 4 }} type="team" />
                  My Matching
                </Menu.Item>
              )}
              {user.isAdmin && (
                <Menu.Item
                  key="15"
                  onClick={() => this.handleMenuClicked("/adminPanel")}
                >
                  <Icon style={{ marginLeft: 4 }} type="dashboard" />
                  Admin Panel
                </Menu.Item>
              )}
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
            </SubMenu>
          )}
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={() => this.closeModal()}
            contentStyle={{
              borderRadius: "20px",
              width: "auto",
              position: "absolute",
              top: "25px",
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
        </Menu>
        <Login onLoginSuccess={this.onLoginSuccess} />
        <Content style={{ padding: "0 50px", backgroundColor: "#fcfcfc" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:userName" component={UserProfile} />
            <Route exact path="/products" component={Product} />
            <Route exact path="/products" component={FavoriteProductsCard} />
            <Route
              exact
              path="/add-product-as-renter"
              component={AddProductCard}
            />
            <Route exact path="/become-a-renter" component={BecomeArenter} />
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
            <Route exact path={`/matching/:userId`} component={MatchesMarket} />
            <Route exact path="/paymentPage" component={PaymentPage} />
            <Route exact path="/search" component={SearchComponenet} />
            <Route exact path="/adminPanel" component={AdminPanel} />
            <Route
              exact
              path="/user/matching/:username"
              component={MatchingStoreComponent}
            />
            <Route
              exact
              path="/users/matching/match/:userName"
              component={MatchComponent}
            />
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
