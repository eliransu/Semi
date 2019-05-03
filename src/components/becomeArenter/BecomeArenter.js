import React, { Component } from 'react'
import Registration from './Registrtion';
export class BecomeArenter extends Component {

	onCancelClicked= ()=>{
		this.props.onCancelClicked()
	}
	onRegistrationSuccess = (user)=>{
		this.props.onRegistrationSuccess(user);
	}
	handleMenuClicked = path => this.props.history.push(path);
  render() {
	return (
		<Registration onRegistrationSuccess={this.onRegistrationSuccess} onCancelClicked={this.onCancelClicked}/>
	  
	)
  }
}

export default BecomeArenter
