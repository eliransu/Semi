import './App.css';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";

import Master from './components/master/Master'
import React from 'react'
import MainHero from './components/mainHero/MainHero'
import { Layout, Menu, Breadcrumb, Button, Icon } from 'antd';
const { Header, Content, Footer } = Layout;


class App extends React.Component {

  handleMenuClicked = path => this.props.history.push(path)


  render() {
    debugger
    return (
      <div>
        <BrowserRouter>
          <Master />
        </BrowserRouter>

      </div>
    )
  }
}
export default App;
