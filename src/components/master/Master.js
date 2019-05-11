import React from "react";
import { Layout, Menu, Icon, Modal } from "antd";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Carousel from "../mainHero/Carousel";
import UserProfile from "../Store/Store";
import About from "../about/About";
import ProductInfo from "../ProductInfo/ProductInfo";
import FavoriteProductsCard from "../product/FavoriteProductsCard";
import AddProductCard from "../product/AddProductCard";
import rootStores from "../../stores";
import BecomeArenter from "../becomeArenter/BecomeArenter";
import agudaImage from "../../assets/aguda.jpg";
import colmanImage from "../../assets/colman.jpg";
import BecomeARenter from "../becomeArenter/BecomeArenter";
import axios from "axios";
import Login from "../Login/Login";
import Product from "../product/Product";
import Category from "../category/Category";
import RegistrationSuccess from "../becomeArenter/RegistrationSeccuss";
import { observer } from "mobx-react";
import AuthStore from "../../stores/AuthStore";
const { Header, Content, Footer } = Layout;
const authStore = rootStores[AuthStore];

@observer

const { Header, Content, Footer } = Layout;
const productStore = rootStores['ProductStore'];
class Master extends React.Component {
  state = {
    visble: false,
    registerSuccessModal: false,
    user: null
  };
	state = {
		visble: false,
		registerSuccessModal: false,
		user: null,
		open: false,
	};

  componentDidMount() {
    try {
      const loggedIn = authStore.tryLogin();
      if (!loggedIn) {
        this.handleMenuClicked("");
      }
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
	constructor(props) {
		super(props)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)

	}

  handleCancel = e => {
    console.log(e);
    this.setState({
      visble: false
    });
  };
  handleMenuClicked = path => this.props.history.push(path);

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

  render() {
    const user = authStore.getCurrentUser;
    console.log("user in render", user);
    return (
      <Layout className="layout">
        <div className="logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "85px" }}
        >
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
            key="9"
            onClick={() => this.handleMenuClicked("productPage")}
          >
            <Icon fontSize={16} type="home" />
            ProductPage
          </Menu.Item>
          <Menu.Item
            style={{ fontSize: 16 }}
            key="2"
            onClick={() => this.handleMenuClicked("products")}
          >
            <Icon
              fontSize={16}
              style={{ marginLeft: 4 }}
              type="shopping-cart"
            />
            Products
          </Menu.Item>
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
          <Menu.Item
            style={{ fontSize: 16 }}
            key="4"
            onClick={() => this.handleMenuClicked("add-product-as-renter")}
          >
            <Icon fontSize={16} style={{ marginLeft: 4 }} type="plus-circle" />
            Add prouct as renter!
          </Menu.Item>

          <Menu.Item
            style={{ fontSize: 16 }}
            key="6"
            onClick={() => this.handleMenuClicked("about")}
          >
            <Icon fontSize={16} style={{ marginLeft: 4 }} type="team" />
            About Us
          </Menu.Item>
          {user.first_name === undefined && (
            <Menu.Item style={{ marginLeft: 70, marginBottom: 20 }} key="7">
              {<Login onLoginSuccess={this.onLoginSuccess} />}
            </Menu.Item>
          )}
          {user.first_name !== undefined && (
            <Menu.Item style={{ marginLeft: 300, marginBottom: 12 }} key="7">
              <span>{`,Wellcome ${user.first_name} ${user.last_name}`}</span>
            </Menu.Item>
          )}
        </Menu>
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
            <Route exact path="/productPage" component={ProductInfo} />
            <Route
              path="/category/:id"
              history={this.props.history}
              component={Category}
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
