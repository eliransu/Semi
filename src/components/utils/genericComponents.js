import React from 'react'
import { Icon } from 'antd'
export const titleRenderer = title =>
  <span style={{ fontWeight: 'bolder', fontSize: 20 }}>{title}</span>

export const contentRenderer = (content, icon, size) =>
  icon
    ? <div style={{ padding: 5 }}><Icon style={{ fontSize: size || 20, marginRight: 10 }} type={icon} /><span style={{ fontSize: 16 }}>{content}</span></div>
    : <span style={{ fontSize: size || 20, padding: 5 }}>{content}</span>
