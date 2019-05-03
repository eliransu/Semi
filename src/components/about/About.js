import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Button, Tooltip } from 'antd'
import ContactUs from './ContactUs'
import { contentRenderer } from '../utils/genericComponents'
const AnyReactComponent = ({ text }) => <Tooltip placement="topLeft" title={`${text} location, come join us`}>
  <Button size="small" type="primary">{text}</Button></Tooltip>

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 31.0461,
      lng: 34.8516
    },
    zoom: 8
  };

  render() {
    return (
      <React.Fragment>
        <ContactUs />
        <div style={{ textAlign: "center" }}>
          {contentRenderer('Have you previously rented from us? Watch our renters around the world', '', 22)}
        </div>
        <div style={{ height: '60vh' }}>
          <br />
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCHfrMCGKVV-wfWMLlkT8nwewHedtQQEhE' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={31.0461}
              lng={34.8516}
              text={'sky'}
            />
            <AnyReactComponent
              lat={31.0463}
              lng={35.8519}
              text={'tools'}
            />
            <AnyReactComponent
              lat={32.0463}
              lng={35.8519}
              text={'electronics'}
            />
          </GoogleMapReact>
        </div>
      </React.Fragment>
    );
  }
}

export default SimpleMap;
