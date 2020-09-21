import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add('欢迎使用', () => {
  return (
    <div>
      <h1>欢迎使用组件</h1>
      <h3>安装试试</h3>
      <code>
        npm install phantom-troupe -save
      </code>
    </div>
  )
}, { info: { disable: true } })