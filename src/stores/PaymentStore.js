import { observable, action, computed } from 'mobx';
import Payment from '../models/Payment';
import OrderService from '../services/OrderService';

export default class PaymentStore {
	@observable providerName;

	@observable consumerName;

	@observable currentProduct;

	@observable startDate;

	@observable endDate;

	@observable plan;

	@observable price = 150;

	@observable viewModal;

	@observable Remarks;

	@observable shipping;

	@observable Payment;

	constructor() {}

	@action
	toggleViewModal = () => {
		if (this.viewModal) {
			this.viewModal = false;
		} else {
			this.viewModal = true;
		}
	};

	@action
	createNewOrder = () => {
		return OrderService.createNewOrder(
			this.providerName,
			this.consumerName,
			this.currentProduct,
			this.plan,
			this.Payment
		)
			.then((res) => {
				console.log('the res from create new order is : ', res);
			})
			.catch((err) => {
				console.log('ERROR in createNewOrder: ', err);
			});
	};

	@action
	setEndDate = (date)=>{
		this.endDate=date
	}

	@computed
	get getStartDate() {
		return this.startDate;
	}
	@computed
	get getEndDate() {
		return this.endDate;
	}
	@computed
	get getCurrentProduct() {
		if (this.currentProduct) {
			return this.currentProduct;
		}
	}
}
