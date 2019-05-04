import { observable, action, computed } from 'mobx';

export default class PaymentStore {
	@observable currentProduct;

	@observable startDate;

	@observable endDate;

	@observable price = 150;

	constructor() {}

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
