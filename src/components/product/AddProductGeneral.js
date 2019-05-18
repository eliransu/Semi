import React from "react";
import {
  InputNumber,
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
  AutoComplete,
  Layout
} from "antd";
import PicturesWall from "./PictureWall";
import PriceInput from "./PriceInput";
import DynamicFieldSet from "./DynamicFieldSet";
import rootStores from "../../stores";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import AuthStore from "../../stores/AuthStore";
import CategoryStore from "../../stores/CategoryStore";

const { Content } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const categoryStore = rootStores[CategoryStore];

@observer
class AddProductGeneral extends React.Component {
  componentDidMount() {
    categoryStore.init();
  }

  handleSubmit = e => {
    console.log("im here!!");
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onNextClicked();
      }
    });
  };
  validate = () => {};
  onTitleChange = e => {
    this.props.product.title = e.target.value;
  };
  onCategorySelect = e => {
    this.props.product.category = e;
  };
  onSubCategorySelect = e => {
    this.props.product.subCategory = e;
  };
  onDescripationChange = e => {
    this.props.product.description = e.target.value;
  };
  onQualitySelect = e => {
    this.props.product.quality = e;
  };

  onImagesChange = urlList => {
    this.props.product.images = urlList;
  };

  renderOptions = () => {
    return categoryStore.getAllCategories.map((category, index) => (
      <Option value={`${category}`}>{category}</Option>
    ));
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 0
        },
        sm: {
          span: 8,
          offset: 6
        }
      }
    };

    return (
      <>
        <Content style={{ paddingTop: "2%", backgroundColor: "#fcfcfc" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label={<span>Product title&nbsp;</span>}
            >
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input your product title!",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  style={{ width: 200 }}
                  placeholder="title"
                  onChange={this.onTitleChange}
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Select category">
              {getFieldDecorator("select-category", {
                rules: [
                  {
                    required: true,
                    message: "Please select the relevant category!",
                    type: "string"
                  }
                ]
              })(
                <Select
                  style={{ width: 200 }}
                  mode="default"
                  placeholder="Please select category"
                  onSelect={this.onCategorySelect}
                >
                  {this.renderOptions()}
                </Select>
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label={<span>Upload photo's</span>}>
              {getFieldDecorator("photo", {
                rules: [{ required: false, message: "", type: "string" }]
              })(
                <div {...formItemLayout}>
                  <PicturesWall onImagesChange={this.onImagesChange} />
                </div>
              )}
            </Form.Item>

            <Form.Item label="Description" {...formItemLayout}>
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: true,
                    message: "please enter product description"
                  }
                ]
              })(
                <Input.TextArea
                  rows={4}
                  placeholder="please enter product description"
                  onChange={this.onDescripationChange}
                />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Quality"
              style={{ paddingBottom: 20 }}
            >
              {getFieldDecorator("quality", {
                rules: [
                  {
                    required: true,
                    message: "Please input your product quality!"
                  }
                ]
              })(
                <Select style={{ width: 200 }} onSelect={this.onQualitySelect}>
                  <Option value="excellent">Excellent</Option>
                  <Option value="good">Good</Option>
                  <Option value="normal">Normal</Option>
                </Select>
              )}
            </Form.Item>

            <div style={{ flex: 1, textAlign: "center", paddingBottom: 25 }}>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: 200 }}
                onClick={this.onNextClicked}
              >
                Next
              </Button>
            </div>
          </Form>
        </Content>
      </>
    );
  }
}

export default Form.create()(AddProductGeneral);
