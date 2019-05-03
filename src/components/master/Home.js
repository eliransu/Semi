import React from 'react'
import { Layout, Menu, Breadcrumb, Button, Icon, Card, Col } from 'antd';
import MainHero from '../../components/mainHero/MainHero'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faShieldAlt, faShippingFast, faHeadset } from '@fortawesome/free-solid-svg-icons'
import { titleRenderer, contentRenderer } from '../utils/genericComponents'
import rootStores from '../../stores';
import CategoryStore from '../../stores/CategoryStore';


const categoryStore = rootStores[CategoryStore];


class Home extends React.Component {

  render() {
    return (
      <React.Fragment>
        <MainHero history={this.props.history}/>

        <div style={{ background: '#E8ECF0', borderRadius: 30, padding: 50, margin: 50 }}>
          <Card style={{ textAlign: "center", borderRadius: 30 }} title={titleRenderer('Why Semi ?', 30)} bordered={false}>
            <Col span={6}>
              <div>{contentRenderer('Pay and Go')}</div>
              <FontAwesomeIcon style={{ padding: 10 }} size="4x" icon={faCreditCard} />
              <div>{contentRenderer('We do the rest for you online, including lease agreement and payments', '', 12)}</div>
            </Col>
            <Col span={6}>
              <div>{contentRenderer('Secure')}</div>
              <FontAwesomeIcon style={{ padding: 10 }} size="4x" icon={faShieldAlt} />
              <div>{contentRenderer('We check our members\' identity and protect your liability.', '', 12)}</div>

            </Col>
            <Col span={6}>
              <div>{contentRenderer('Fast')}</div>
              <FontAwesomeIcon style={{ padding: 10 }} size="4x" icon={faShippingFast} />
              <div>{contentRenderer('We deliver to your location within Twin Cities Metro in three hours or less.', '', 12)}</div>

            </Col>
            <Col span={6}>
              <div>{contentRenderer('Support')}</div>
              <FontAwesomeIcon style={{ padding: 10 }} size="4x" icon={faHeadset} />
              <div>{contentRenderer('Our customer service is there for you.', '', 12)}</div>

            </Col>
          </Card>
        </div>

      </React.Fragment>
    )
  }
}

export default Home