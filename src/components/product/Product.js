import React from 'react';
import { Rate, Card, Icon, Avatar } from 'antd';
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';
import ShowMoreText from 'react-show-more-text';
import MainHero from '../mainHero/MainHero'
const data = [
  {
    actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <ShowMoreText lines={1}
        more='Show more'
        less='Show less'
        anchorClass=''

      >
        <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
      </ShowMoreText>
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

      <ShowMoreText lines={1}
        more='Show more'
        less='Show less'
        anchorClass=''

      >
        <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
      </ShowMoreText>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];

const { Meta } = Card;

const Product = props => {

  return (
    <React.Fragment>
      <MainHero />
      <Card
        headStyle={{}}
        style={{ width: 300 }}
        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
        actions={[
          <div>
            <div> Product rate: <Rate defaultValue={3} /> 
            </div>
            <div>
           <ShowMoreText lines={1} 
                more='Show all comments'
                less='Show less comments '
                anchorClass=''>
          <List
            className="comment-list"
            header={`${data.length} replies`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                     <Comment
                       actions={item.actions}
                       author={item.author}
                       avatar={item.avatar}
                       content={item.content}
                       datetime={item.datetime}
                      />
                    
             
            )}
          /> </ShowMoreText ></div>  </div>]}
        bordered={true}

      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="Product Name "
          description="This is the product description"
        />
      </Card>
    </React.Fragment>

  );
}


export default Product 