import React, { Component } from "react";
import { Rate, Comment, Tooltip, List } from "antd";
import moment from "moment";

export class RreviewsList extends Component {
  componentDidMount() {
    //option:: change the data format for prettier look
    //****look example at the top****
  }

  render() {
    const { data } = this.props;
    return (
      <List
        className="comment-list"
        header={`${data.length} replies`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <>
            <Rate
              allowHalf
              disabled
              defaultValue={item.stars}
              style={{ textAlign: "center", fontSize: "15px" }}
            />
            <Comment
              actions={[<span>Reply to</span>]}
              author={item && item.creator ? item.creator.first_name : ""}
              avatar={
                item && item.creator && item.creator.profile_image
                  ? item.creator.profile_image
                  : require("../../assets/eliran.png")
              }
              content={item.content}
              datetime={moment(item.createdAt).format("DD/MM/YY")}
            />
          </>
        )}
      />
    );
  }
}
export default RreviewsList;
