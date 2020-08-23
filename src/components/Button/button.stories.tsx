import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'

const defaultButton = () => (
  <Button onClick={action('default button')}>default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size='lg'>large button</Button>
    <Button size='sm'>small button</Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='link' href='http://www.baidu.com'>link button</Button>
  </>
)

storiesOf('Button', module)
  .add('Button', defaultButton)
  .add('不同尺寸 Button', buttonWithSize)
  .add('不同类型 Button', buttonWithType)
