import { observable } from 'mobx';

export default class Payment {
	@observable CreditCardNumber;

	@observable monthCardvalidity;

	@observable yearCardvalidity;

	@observable cvv;

	@observable userId;

	@observable userFullName;

	constructor(payment) {
		if (payment) {
			this.CreditCardNumber = payment.CreditCardNumber;
			this.monthCardvalidity = payment.monthCardvalidity;
			this.yearCardvalidity = payment.yearCardvalidity;
			this.cvv = payment.cvv;
			this.userId = payment.userId;
			this.userFullName = payment.userFullName;
		}
	}
}
