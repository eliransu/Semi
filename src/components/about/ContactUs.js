import React from 'react'
import { Card } from 'antd';
import { titleRenderer, contentRenderer } from '../utils/genericComponents'
const ContactUs = props => {
  return (
    <div style={{ background: '#f2f2f2', padding: '30px', margin: 30 }}>
      <Card title={titleRenderer('Feel free to contact us !')} bordered={false} >
        <div>
          {contentRenderer('Address: Givati 11 Rishon Le Zion, Israel', 'home')}
        </div>
        <div>
          {contentRenderer('Phone number: +972 503928119', 'phone')}
        </div>
        <div>
          {contentRenderer('Send mail: Support@semi.com', 'mail')}
        </div>
      </Card>
    </div>
  )
}

export default ContactUs