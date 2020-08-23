import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import '../src/styles/index.scss'
import './fix_info_style.scss'

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
  width: '700px'
}

const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)

addParameters({
  info: { inline: true, header: false }
})
addDecorator(storyWrapper)
addDecorator(withInfo)

