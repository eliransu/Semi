import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "mobx-react";

import Master from "./components/master/Master";
import React from "react";
import MainHero from "./components/mainHero/MainHero";
import { Layout, Menu, Breadcrumb, Button, Icon } from "antd";
import rootStores from "./stores";
import AppLoading from "./components/AppLoading/AppLoading";
const { Header, Content, Footer } = Layout;

class App extends React.Component {
  handleMenuClicked = path => this.props.history.push(path);

  render() {
    return (
      <React.Fragment>
        <AppLoading />
        <Provider {...rootStores}>
          <BrowserRouter>
            <Master />
          </BrowserRouter>
        </Provider>
      </React.Fragment>
    );
  }
}
export default App;
