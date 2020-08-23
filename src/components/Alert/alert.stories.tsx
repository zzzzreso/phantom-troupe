import React from 'react'
import { storiesOf } from '@storybook/react'
import Alert from './alert'

const defaultAlert = () => (
  <Alert title='this is default' type='default' closable />
)

const AlertWithType = () => (
  <>
    <Alert title='this is success' type='success' closable />
    <Alert title='this is danger' type='danger' closable />
    <Alert title='this is warning' type='warning' closable />
  </>
)

const AlertWithDesc = () => (
  <>
    <Alert title='this is a description' type='default' description='描述标题' />
  </>
)


storiesOf('Alert', module)
  .add('Alert', defaultAlert)
  .add('不同类型的 Alert', AlertWithType)
  .add('添加描述的 Alert', AlertWithDesc)