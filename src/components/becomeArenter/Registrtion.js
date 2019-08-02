import React, { Component } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
import axios from "axios";
import rootStores from "../../stores";
import AuthStore from "../../stores/AuthStore";
import PicturesWall from "../product/PictureWall";
import AlertUtils from "../utils/AlertUtils";
import ViewStore from "../../stores/ViewStore";

const authStore = rootStores[AuthStore];
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const viewStore = rootStores[ViewStore];

const residences = [
  {
    value: "israel",
    label: "Israel",
    children: [
      {
        value: "tlv",
        label: "Tel-Aviv",
        children: [
          {
            value: "southTlv",
            label: "South Tel-Aviv"
          },
          {
            value: "northTlv",
            lable: "North Tel-Aviv"
          }
        ]
      },
      {
        value: "rishon",
        label: "Rishon-Le-Ziyon",
        children: [
          {
            value: "west",
            label: "Rishon West"
          },
          {
            value: "east",
            label: "Rishon East"
          },
          {
            value: "center",
            label: "Rishon Center"
          }
        ]
      }
    ]
  },
  {
    value: "germany",
    label: "Germany",
    children: [
      {
        value: "berlin",
        label: "Berlin",
        children: [
          {
            value: "cent",
            label: "Berlin Center"
          }
        ]
      }
    ]
  }
];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    storeName: "",
    location: "",
    phoneNumber: "",
    loading: false,
    fileList: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  addProductClicked = () => {
    if (this.state.password === this.state.confirmedPassword) {
      const user = {
        email: this.state.email,
        password: this.state.password,
        storeName: this.state.storeName,
        phoneNumber: this.state.phoneNumber
      };
    }
    this.props.addProductClicked();
  };

  handleEmailChange = e => {
    e.preventDefault();
    const email = e.target.value;
    this.setState({ email: email });
  };

  handlePasswordChange = e => {
    e.preventDefault();
    const password = e.target.value;
    this.setState({ password: password });
  };

  handleConfirmedPasswordChange = e => {
    e.preventDefault();
    const pass = e.target.value;
    this.setState({ confirmedPassword: pass });
  };
  handleStoreChange = e => {
    e.preventDefault();
    const store = e.target.value;
    this.setState({ storeName: store });
  };
  handlePhoneChange = e => {
    e.preventDefault();
    const phone = e.target.value;
    this.setState({ phoneNumber: phone });
  };
  handleFirstNameChanged = e => {
    e.preventDefault();
    const firstName = e.target.value;
    this.setState({ firstName });
  };
  handleLastNameChanged = e => {
    e.preventDefault();
    const lastName = e.target.value;
    this.setState({ lastName });
  };
  handleUserNameChanged = e => {
    e.preventDefault();
    const userName = e.target.value;
    this.setState({ userName });
  };

  registerMember = async () => {
    viewStore.setappLoadingBoolean(false);
    const {
      firstName,
      lastName,
      password,
      userName,
      confirmedPassword,
      phoneNumber,
      storeName,
      location,
      email,
      confirmDirty,
      fileList
    } = this.state;

    if (password === confirmedPassword && confirmDirty) {
      const user = {
        firstname: firstName,
        lastname: lastName,
        username: userName,
        email,
        password,
        phoneNumber,
        profileImage: fileList ? fileList[0] : ""
      };
      try {
        const res = await authStore.register(user);
        if (res) {
          this.props.onRegistrationSuccess(authStore.getCurrentUser);
        } else {
          throw new Error("Registration Failed");
        }
      } catch (err) {
        AlertUtils.failureAlert(err);
      } finally {
        viewStore.setappLoadingBoolean(true);
      }
    }
  };

  onImagesChange = urlList => {
    this.setState({ fileList: urlList });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      loading,
      email,
      password,
      storeName,
      userName,
      phoneNumber,
      location,
      confirmedPassword,
      firstName,
      lastName
    } = this.state;

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
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "972"
    })(
      <Select style={{ width: 70 }}>
        <Option value="972">+972</Option>
        <Option value="49">+49</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label={<span>Upload photo's</span>}>
          {getFieldDecorator("photo", {
            rules: [{ required: false, message: "", type: "string" }]
          })(
            <div {...formItemLayout}>
              <PicturesWall onImagesChange={this.onImagesChange} />
            </div>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="First Name">
          {getFieldDecorator("firstName", {
            rules: [
              {
                required: true,
                message: "Enter your first name"
              }
            ]
          })(
            <Input onChange={this.handleFirstNameChanged} value={firstName} />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Last Name">
          {getFieldDecorator("lastName", {
            rules: [
              {
                required: true,
                message: "Please input your last name"
              }
            ]
          })(<Input onChange={this.handleLastNameChanged} value={lastName} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="User Name">
          {getFieldDecorator("userName", {
            rules: [
              {
                required: true,
                message: "Enter your user Name"
              }
            ]
          })(<Input onChange={this.handleUserNameChanged} value={userName} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input onChange={this.handleEmailChange} value={email} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input
              onChange={this.handlePasswordChange}
              value={password}
              type="password"
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Confirm Password">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              type="password"
              onChange={this.handleConfirmedPasswordChange}
              value={confirmedPassword}
              onBlur={this.handleConfirmBlur}
            />
          )}
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
          {getFieldDecorator("storeName", {
            rules: [
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true
              }
            ]
          })(<Input onChange={this.handleStoreChange} value={storeName} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Location">
          {getFieldDecorator("residence", {
            initialValue: ["zhejiang", "hangzhou", "xihu"],
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your habitual residence!"
              }
            ]
          })(<Cascader options={residences} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(
            <Input
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
              onChange={this.handlePhoneChange}
              value={phoneNumber}
            />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator("agreement", {
            valuePropName: "checked"
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.registerMember}
            loading={loading}
          >
            Register
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            type="primary"
            htmlType="submit"
            onClick={() => this.props.onCancelClicked()}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
