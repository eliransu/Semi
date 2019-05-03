import React, { Component } from 'react';
import { Button } from 'antd';

export default class RegistrationSeccuss extends Component {
	addProductClicked = () => {
		this.props.onAddProductClicked();
	};
	render() {
		return (
			<div className="registration-success-container" style={{ textAlign: 'center' }}>
				<div className="header-text">
					<span style={{ fontSize: 16 }}>ההרשמה בוצעה בהצלחה,עלייך לאשר את חשבונך במייל</span>
				</div>
				<div className="add-product-container" style={{paddingTop:10}}>
					<span style={{ fontSize: 16 }}>למה לחכות?! בוא והוסף את המוצר הראשון לחנות שלך כבר עכשיו</span>
					<div className="btn-group" style={{paddingTop:10,paddingBottom:10}}>
						<Button
							style={{ background: 'green', marginRight: 10 }}
							type="primary"
							onClick={this.addProductClicked}
						>
							Add First Product
						</Button>
						<Button type="primary" onClick={() => this.props.returnToHomePage()}>
							Return To Home
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
