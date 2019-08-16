import { Button, Col, Pagination, Row } from 'antd';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import rootStores from '../../stores';
import MatchesStore from '../../stores/MatchesStore';
import ProductStore from '../../stores/ProductStore';
import Product from '../Store/Product';
import AlertUtils from '../utils/AlertUtils';
import { MatchingAction } from '../utils/enums';
const productStore = rootStores[ProductStore];
const matchesStore = rootStores[MatchesStore];
@observer
class MatchesMarket extends Component {
	componentDidMount() {
		const userId = this.props.match.params.userId;

		try {
			if (userId !== 'undefined') {
				productStore.getMtchingMarketProducts(userId);
			}
		} catch (err) {
			// console.log(err);
			AlertUtils.failureAlert(err);
		}
	}

	state = {
		page: 1,
		counter: 0,
		productsToTake: []
	};

	onPageCanged = (page) => {
		this.setState({ page });
	};

	onMatchingClicked = async () => {
		try {
			const result = await matchesStore.enterProductsForMatch(this.state.productsToTake, MatchingAction.Take);
			AlertUtils.successAlert(
				'The Algorithm start and work for you',
				'we will notice you when we find a matching for you'
			);
			this.props.history.replace('/');
		} catch (err) {
			AlertUtils.failureAlert(err);
		}
	};

	setCount = (value, productId) => {
		let counter = value ? this.state.counter + 1 : this.state.counter - 1;
		this.setState({ counter });
		if (value) {
			this.state.productsToTake.push(productId);
		} else {
			const filtered = this.state.productsToTake.filter((product) => {
				return product != productId;
			});
			this.setState({ productsToTake: filtered });
		}
	};

	loadBulk = (products) => {
		let bulkProducts = [];
		let start = (this.state.page - 1) * 9;
		let end = this.state.page * 9;
		for (let i = start; i < end && i < products.length; i++) {
			bulkProducts.push(products[i]);
		}
		return bulkProducts;
	};

	renderAllProducts = () => {
		const disable = this.state.counter > 4 ? true : false;
		console.log('res', productStore.getMatchingProducts);
		const products = this.loadBulk(productStore.getMatchingProducts);
		if (products.length > 0) {
			return products.map((product, index) => (
				<Col span={8} style={{ marginBottom: 25 }}>
					<Product
						starts={productStore.getAvargeScoreByProduct(product)}
						history={this.props.history}
						product={product}
						key={index}
						marketPlace={true}
						opacity={true}
						onCounterChanged={this.setCount}
						counter={this.state.counter}
						checkBoxDisable={disable}
					/>
				</Col>
			));
		} else {
			return (
				<div style={{ textAlign: 'center', paddingBottom: 30, paddingLeft: 85 }}>
					<h2>Not any Products for Match</h2>
				</div>
			);
		}
	};
	render() {
		const products = productStore.getMatchingProducts;
		const dataSize = products.length;

		return (
			<div>
				<div style={{ textAlign: 'center', padding: '20px 0px' }}>
					<h1 style={{ textDecoration: 'underline' }}>Matching Market Place</h1>
				</div>
				<Row style={{ width: '86%' }}>
					<div className="all-products" style={{ paddingLeft: 120 }}>
						{this.renderAllProducts()}
					</div>
				</Row>
				<div style={{ textAlign: 'center', paddingBottom: 25 }}>
					<Button
						style={{ width: 200 }}
						type="primary"
						disable={this.state.counter === 0 ? true : false}
						onClick={() => this.onMatchingClicked()}
					>{`Matching (${this.state.counter})`}</Button>
				</div>

				<div style={{ textAlign: 'center', padding: '20px 0px' }}>
					<Pagination defaultCurrent={1} total={dataSize} pageSize={12} onChange={this.onPageCanged} />
				</div>
			</div>
		);
	}
}
export default MatchesMarket;
