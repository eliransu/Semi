import './App.css';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import {Provider} from 'mobx-react'

import Master from './components/master/Master'
import React from 'react'
import MainHero from './components/mainHero/MainHero'
import { Layout, Menu, Breadcrumb, Button, Icon } from 'antd';
import rootStores from './stores';
const { Header, Content, Footer } = Layout;


class App extends React.Component {

  handleMenuClicked = path => this.props.history.push(path)


  render() {
    return (
      <Provider {...rootStores}>
        <BrowserRouter>
          <Master />
        </BrowserRouter>

        </Provider>
    )
  }
}
export default App;
