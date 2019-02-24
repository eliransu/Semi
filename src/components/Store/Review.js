import React, { Component } from 'react'
import {
    Comment, Icon, Tooltip, Avatar,Rate
  } from 'antd';
  import moment from 'moment';
  

export class Review extends Component {
  render() {

    const review =this.props.review;
    return (
        <Comment
          actions={[<div><Rate defaultValue={review.value}/></div>]}
          author={<a>{review.name}</a>}
          avatar={(
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt={review.name}
            />
          )}
          content={(
            <p>{review.content}</p>
          )}
          datetime={(
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          )}
        />
      );
  }
}

export default Review
