import React, {Component} from 'react';
import { Rate,Comment, Tooltip, List } from 'antd';
import moment from 'moment';

const data = [
  {
    actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];


export class RreviewsList extends Component {

    componentDidMount(){
        //option:: change the data format for prettier look
        //****look example at the top****
    }

    render() {
        return (
            <List
                className="comment-list"
                header={`${this.props.data.length} replies`}
                itemLayout="horizontal"
                dataSource={this.props.data}
                renderItem={item => (
                    <>
                    <Rate allowHalf disabled defaultValue={item.numOfstart} style={{textAlign: "center", fontSize: "15px"}} />
                    <Comment
                        actions={item.user.actions}
                        author={item.user.name}
                            avatar={require(`../../assets/${item.user.avatar}`)}
                        content={item.content}
                        datetime={item.datetime}
                    />
                    </>
                )}
            />
        )
    }
}
export default RreviewsList