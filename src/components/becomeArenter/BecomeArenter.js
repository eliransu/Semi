import React, { Component } from 'react';
import './BecomeArenter.css';
import { Form, Input, Button, Radio, Select } from 'antd';
const Option = Select.Option;

export class BecomeArenter extends Component {
	constructor() {
		super();
		this.state = {
			formLayout: 'horizontal',
			visable: [ true, false, false ],
			description: '',
			imgURL: '',
			cost: 0
		};
	}

	handleChange = (value) => {
		console.log(value);
	};
	titleButtonClick = () => {
		console.log('btn clicked!!');
	};

	render() {
		const { formLayout } = this.state;

		const formItemLayout =
			formLayout === 'horizontal'
				? {
						labelCol: { span: 4 },
						wrapperCol: { span: 14 }
					}
				: null;
		const buttonItemLayout =
			formLayout === 'horizontal'
				? {
						wrapperCol: { span: 14, offset: 4 }
					}
				: null;

		return (
			<React.Fragment>
				{this.state.visable[0] && (
					<div className="main-title-container">
						<div className="title-item">
							<Form.Item label="" {...formItemLayout}>
								<Input placeholder="Product title" />
							</Form.Item>
						</div>

						<div className="title-item">
							<Select
								showSearch
								style={{ width: 395 }}
								label="Category:"
								placeholder="Select a person"
								optionFilterProp="children"
								onChange={this.handleChange}
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								<Option value="sport">Sport</Option>
								<Option value="tool">Tool</Option>
								<Option value="home">Home&Garden</Option>
								<Option value="electronics">Electronics</Option>
								<Option value="clothes">Clothes</Option>
							</Select>
                        </div>
                        
						<div className="title-item-btn">
							<Button type="primary" onClick={this.titleButtonClick}>
								Next
							</Button>
						</div>
					</div>
                )}
                {this.state.visable[0]&&<div className="main-title-container">
                <div className="title-item">
                    <Form.Item label="" {...formItemLayout}>
                        <Input placeholder="Product title" />
                    </Form.Item>
                </div>

                <div className="title-item">
                    <Select
                        showSearch
                        style={{ width: 395 }}
                        label="Category:"
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="sport">Sport</Option>
                        <Option value="tool">Tool</Option>
                        <Option value="home">Home&Garden</Option>
                        <Option value="electronics">Electronics</Option>
                        <Option value="clothes">Clothes</Option>
                    </Select>
                </div>
                
                <div className="title-item-btn">
                    <Button type="primary" onClick={this.titleButtonClick}>
                        Next
                    </Button>
                </div>
            </div>}
			</React.Fragment>
		);
	}
}

export default BecomeArenter;
