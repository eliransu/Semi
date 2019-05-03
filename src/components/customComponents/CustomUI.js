import React from 'react'
import * as Antd from 'antd'
import MediaQuery from 'react-responsive';

export const Input = props =>
  <React.Fragment>
    <MediaQuery query='(max-device-width : 480px)'>
      <Antd.Input {...props} style={{
        marginTop: 17, width: '70%', marginRight: '15%',
        textAlign: 'right', ...props.style, fontSize: 18
      }} />
    </MediaQuery>
    <MediaQuery query='(min-device-width : 480px)'>eliran suisa</MediaQuery>
  </React.Fragment>

export const InputNumber = props =>
  <React.Fragment>
    <MediaQuery query='(max-device-width : 480px)'>
      <Antd.InputNumber {...props} min={0}
        defaultValue={0} style={{
          textAlign: 'center', ...props.style
        }} />
    </MediaQuery>
    <MediaQuery query='(min-device-width : 480px)'>eliran suisa</MediaQuery>
  </React.Fragment>

export const Text = props =>
  <React.Fragment>
    <MediaQuery query='(max-device-width : 480px)'>
      <div {...props} style={{
        color: 'white', margin: 15, marginBottom: props.title ? '20%' : 15, ...props.style, fontSize: props.title ? 24 : mapSizeToNumber(props.size),
        fontFamily: 'Rubik', textAlign: props.center ? 'center' : 'right'
      }}>
        {props.children}
        {props.icon && <Antd.Icon style={{ paddingRight: 5, fontSize: props.size && mapSizeToNumber(props.size) }} type={props.icon} />}
      </div>
    </MediaQuery>
    <MediaQuery query='(min-device-width : 480px)'>eliran suisa</MediaQuery>
  </React.Fragment >

export const Button = props =>
  <React.Fragment>
    <MediaQuery query='(max-device-width : 480px)'>
      <Antd.Button {...props} style={{ marginTop: 17, ...props.style, marginRight: props.center && '37%', color: props.color }} />
    </MediaQuery>
    <MediaQuery query='(min-device-width : 480px)'>eliran suisa</MediaQuery>
  </React.Fragment>


export const Marginer = props => <div style={{ marginTop: `${props.num}%`, marginBottom: `${props.num}%` }} />


const mapSizeToNumber = size => {
  switch (size) {
    case 'sm': {
      return 12
    }
    case 'md': {
      return 14
    }
    case 'lg': {
      return 16
    }
    case 'xl': {
      return 18
    }
    case 'xxl': {
      return 20
    }
    case 'xxxl': {
      return 24
    }
    default: {
      return 16
    }

  }
} 