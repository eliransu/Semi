
import React,{Component} from 'react';
import axios from 'axios';
import {Col} from 'antd';
import Product from '../Store/Product'
import rootStores from '../../stores';
import CategoryStore from '../../stores/CategoryStore';

const categoryStore = rootStores[CategoryStore];

export default class Category extends Component {
	state = {
		loading:true
	};

	componentDidMount() {

		console.log('in compo:',this.props.match.params.id)

		 categoryStore.getCategoryById(this.props.match.params.id)
		.then(res=>{
			if(res){
				this.setState({loading:false})
			}
		})
	
	}
	renderAllProducts = () => {
   
		
		return categoryStore.getCurrentCategory.map((product,index)=>(
			<Col span={8} style={{padding:30}}>
			<Product product={product} key={index}/>
			</Col> 
		))
  
    
		
	};





	render() {

		return <div>{this.renderAllProducts()}</div>;
	}
}
