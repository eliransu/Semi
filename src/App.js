import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "mobx-react";
import {geolocated} from "react-geolocated";
import axios from 'axios';
import Master from "./components/master/Master";
import React from "react";
import MainHero from "./components/mainHero/MainHero";
import { Layout, Menu, Breadcrumb, Button, Icon } from "antd";
import rootStores from "./stores";
import AppLoading from "./components/AppLoading/AppLoading";
const { Header, Content, Footer } = Layout;


const App = (props)=>{

	const handleMenuClicked = path => this.props.history.push(path)

	React.useEffect( () => {
		if(props.coords){
			const {latitude,longitude} = props.coords;
			const userAgent = navigator.userAgent;
			 axios.post('/api/users/location',{longitude,latitude,userAgent})
		}
	}, [props.coords])

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
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 100000000000,
})(App);
