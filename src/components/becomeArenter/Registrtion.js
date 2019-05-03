import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
	{
		value: 'israel',
		label: 'Israel',
		children: [
			{
				value: 'tlv',
				label: 'Tel-Aviv',
				children: [
					{
						value: 'southTlv',
						label: 'South Tel-Aviv'
					},
					{
						value: 'northTlv',
						lable: 'North Tel-Aviv'
					}
				]
			},
			{
				value: 'rishon',
				label: 'Rishon-Le-Ziyon',
				children: [
					{
						value: 'west',
						label: 'Rishon West'
					},
					{
						value: 'east',
						label: 'Rishon East'
					},
					{
						value: 'center',
						label: 'Rishon Center'
					}
				]
			}
		]
	},
	{
		value: 'germany',
		label: 'Germany',
		children: [
			{
				value: 'berlin',
				label: 'Berlin',
				children: [
					{
						value: 'cent',
						label: 'Berlin Center'
					}
				]
			}
		]
	}
];

class RegistrationForm extends React.Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: []
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields([ 'confirm' ], { force: true });
		}
		callback();
	};

	handleWebsiteChange = (value) => {
		let autoCompleteResult;
		if (!value) {
			autoCompleteResult = [];
		} else {
			autoCompleteResult = [ '.com', '.org', '.net' ].map((domain) => `${value}${domain}`);
		}
		this.setState({ autoCompleteResult });
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { autoCompleteResult } = this.state;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 }
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0
				},
				sm: {
					span: 16,
					offset: 8
				}
			}
		};
		const prefixSelector = getFieldDecorator('prefix', {
			initialValue: '972'
		})(
			<Select style={{ width: 70 }}>
				<Option value="972">+972</Option>
				<Option value="49">+49</Option>
			</Select>
		);


		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item {...formItemLayout} label="E-mail">
					{getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								message: 'The input is not valid E-mail!'
							},
							{
								required: true,
								message: 'Please input your E-mail!'
							}
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item {...formItemLayout} label="Password">
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Please input your password!'
							},
							{
								validator: this.validateToNextPassword
							}
						]
					})(<Input type="password" />)}
				</Form.Item>
				<Form.Item {...formItemLayout} label="Confirm Password">
					{getFieldDecorator('confirm', {
						rules: [
							{
								required: true,
								message: 'Please confirm your password!'
							},
							{
								validator: this.compareToFirstPassword
							}
						]
					})(<Input type="password" onBlur={this.handleConfirmBlur} />)}
				</Form.Item>
				<Form.Item
					{...formItemLayout}
					label={
						<span>
							Store Name&nbsp;
							<Tooltip title="The Name of your store, people can search your store by name">
								<Icon type="question-circle-o" />
							</Tooltip>
						</span>
					}
				>
					{getFieldDecorator('storeName', {
						rules: [ { required: true, message: 'Please input your nickname!', whitespace: true } ]
					})(<Input />)}
				</Form.Item>
				<Form.Item {...formItemLayout} label="Location">
					{getFieldDecorator('residence', {
						initialValue: [ 'zhejiang', 'hangzhou', 'xihu' ],
						rules: [ { type: 'array', required: true, message: 'Please select your habitual residence!' } ]
					})(<Cascader options={residences} />)}
				</Form.Item>
				<Form.Item {...formItemLayout} label="Phone Number">
					{getFieldDecorator('phone', {
						rules: [ { required: true, message: 'Please input your phone number!' } ]
					})(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
				</Form.Item>
				<Form.Item {...formItemLayout} label="Captcha" extra="We must make sure that your are a human.">
					<Row gutter={8}>
						<Col span={12}>
							{getFieldDecorator('captcha', {
								rules: [ { required: true, message: 'Please input the captcha you got!' } ]
							})(<Input />)}
						</Col>
						<Col span={12}>
							<Button>Get captcha</Button>
						</Col>
					</Row>
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					{getFieldDecorator('agreement', {
						valuePropName: 'checked'
					})(
						<Checkbox>
							I have read the <a href="">agreement</a>
						</Checkbox>
					)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						Add Your First Product
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;
