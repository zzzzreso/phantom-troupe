import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from './icon'
import Button from '../Button/button'

const defaultIcon = () => (
  <>
    <Icon
      icon="check"
      size="3x"
    />
    <Icon
      icon="times"
      size="3x"
    />
    <Icon
      icon="anchor"
      size="3x"
    />
    <Icon
      icon="trash"
      size="3x"
    />
    <Button
      btnType="primary"
      disabled={false}
      size="lg"
    >
      <Icon icon="check" />
       check
    </Button>
  </>
)

const IconWithTheme = () => (
  <>
    <Icon
      icon="check"
      size="3x"
      theme="success"
    />
    <Icon
      icon="times"
      size="3x"
      theme="danger"
    />
    <Icon
      icon="anchor"
      size="3x"
      theme="primary"
    />
    <Icon
      icon="exclamation-circle"
      size="3x"
      theme="warning"
    />
  </>
)

const IconWithMoreFeature = () => (
  <>
    <Icon
      icon="spinner"
      size="3x"
      spin
      theme="primary"
    />
    <Icon
      icon="spinner"
      pulse
      size="3x"
      theme="success"
    />
  </>
)

storiesOf('Icon', module)
  .add('Icon', defaultIcon)
  .add('不同主题的Icon', IconWithTheme)
  .add('更多行为的Icon', IconWithMoreFeature, {
    info: { text: "更多例子请参见：https://github.com/FortAwesome/react-fontawesome#basic" },
  })