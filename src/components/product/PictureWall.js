import React from "react";
import { Upload, Icon, Modal, Avatar } from "antd";
import { Button } from "antd/lib/radio";

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    urlList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = res => {
    this.setState({ fileList: res.fileList }, () => {
      if (res.file.response) {
        if (res.file.status === "done") {
          this.setState(
            { urlList: [...this.state.urlList, res.file.response] },
            () => {
              this.props.onImagesChange(this.state.urlList);
            }
          );
        }
        if (res.file.status === "removed") {
          var filtered = this.state.urlList.filter(url => {
            return url !== res.file.response;
          });
          if (!filtered) filtered = [];
          this.setState({ urlList: filtered }, () => {
            this.props.onImagesChange(this.state.urlList);
          });
        }
      }
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { regisrtation } = this.props;
    const uploadButton = (
      <div>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const uploadAvatarButton = (
      <div>
        <Avatar size={64} icon="user" />
      </div>
    );

    return (
      <div className="clearfix">
        <Upload
          name="image"
          action="/api/products/upload-image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList && fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
