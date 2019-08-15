import { Form, Icon, Input, Button, Modal } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';
import AuthStore from '../../stores/AuthStore';
import rootStores from '../../stores';
import { observer } from 'mobx-react';
import BecomeArenter from '../becomeArenter/BecomeArenter';
import Registration from '../becomeArenter/Registrtion';
import AlertUtils from '../utils/AlertUtils';

const authStore = rootStores[AuthStore];

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
@observer
class HorizontalLoginForm extends Component {
	componentDidMount() {
		// To disabled submit button at the beginning.
		this.props.form.validateFields();
	}

	state = {
		loading: false,
		disabled: false
	};

	showModal = () => {
		authStore.toggleviewLoginModal();
	};

	handleOk = (e) => {
		authStore.toggleviewLoginModal();
	};

	handleCancel = (e) => {
		authStore.toggleviewLoginModal();
	};

	onCancelClicked = () => {
		authStore.togglevSignInModal();
	};
	onRegistrationSuccess = (user) => {
		this.props.onRegistrationSuccess(user);
	};

	redirectToSignIn = () => {
		authStore.toggleviewLoginModal();
		return (
			<Registration onRegistrationSuccess={this.onRegistrationSuccess} onCancelClicked={this.onCancelClicked} />
		);
	};

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					this.setState({ loading: true, disabled: true });
					const res = await authStore.login(values.userName, values.password);

					if (res) {
						this.setState({ loading: false, disabled: false });
						this.props.onLoginSuccess(authStore.getCurrentUser);
						authStore.toggleviewLoginModal();
						AlertUtils.successAlert('Login Success', 'enjoy to share!');
					}
				} catch (err) {
					this.setState({ loading: false, disabled: false });
					AlertUtils.failureAlert(err.toString());
				}
			}
		});
	};

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

		// Only show error after a field is touched.
		const userNameError = isFieldTouched('userName') && getFieldError('userName');
		const passwordError = isFieldTouched('password') && getFieldError('password');
		return (
			<div className="login-main-contianer">
				<Modal
					style={{ width: '300px', height: '510px', borderRadius: '50px' }}
					title="Login"
					visible={authStore.viewLoginModal}
					onCancel={this.handleCancel}
					footer={[]}
				>
					<Form onSubmit={this.handleSubmit}>
						<Form.Item validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
							{getFieldDecorator('userName', {
								rules: [ { required: true, message: 'Please input your username!' } ]
							})(
								<Input
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="Email"
								/>
							)}
						</Form.Item>
						<Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
							{getFieldDecorator('password', {
								rules: [ { required: true, message: 'Please input your Password!' } ]
							})(
								<Input
									onChange={this.onPasswordChanged}
									prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									placeholder="Password"
								/>
							)}
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								disabled={hasErrors(getFieldsError())}
								onClick={this.handleSubmit}
								loading={this.state.loading}
								disabled={this.state.disabled}
							>
								Log in
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		);
	}
}

const Login = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default Login;
