import React, { Component } from "react";
import Avatar from "./Avatar";
import { Card } from "antd";
const { Meta } = Card;

export class UserDescription extends Component {
  render() {
    const { user, isMatch } = this.props;
    const borderStyle = this.props.border ? "2px solid lightgreen" : "";

    return (
      <div style={{ textAlign: isMatch ? "-webkit-center" : "" }}>
        <div className="user-card" style={{ textAlign: "-webkit-center" }}>
          <Card
            hoverable
            style={{ width: 240, border: borderStyle }}
            cover={
              <img
                alt="example"
                src={
                  user && user.profile_image
                    ? user.profile_image
                    : require("../../assets/eliran.png")
                }
              />
            }
          >
            <Meta
              style={{ paddingBottom: 20 }}
              title={user ? `${user.first_name} ${user.last_name}` : ""}
              description={`${user ? user.email : ""}\n
                                          phone:${
                                            user ? user.phone_number : ""
                                          }\n
                                          Location:${
                                            user ? user.address.country : ""
                                          }-${user ? user.address.city : ""}`}
            />
            {user &&
            user.products_to_give &&
            user.products_to_give.length > 0 ? (
              <a
                style={{ textDecoration: "underline" }}
                href={`/user/matching/${user.username}`}
              >
                Matching Products
              </a>
            ) : (
              ""
            )}
          </Card>
        </div>
      </div>
    );
  }
}

export default UserDescription;
