import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Tabs from './tabs'
import Icon from '../Icon/icon'
import { TabItem } from './tabsItem'

const defaultTabs = () => (
  <Tabs onSelect={action('selected')}>
    <TabItem label='选项卡一'>选项卡一的内容</TabItem>
    <TabItem label='选项卡二'>选项卡二的内容</TabItem>
  </Tabs>
)

const cardTabs = () => (
  <Tabs onSelect={action('selected')} type='card'>
    <TabItem label='选项卡一'>选项卡一的内容</TabItem>
    <TabItem label='选项卡二'>选项卡二的内容</TabItem>
    <TabItem label='disabled' disabled>选项卡三的内容</TabItem>
  </Tabs>
)

const customTabs = () => (
  <Tabs onSelect={action('selected')} type='card'>
    <TabItem
      label={
        <>
          <Icon icon='check-circle' /> 自定义图标{" "}
        </>
      }
    >
      选项卡一的内容
    </TabItem>
    <TabItem label='选项卡二'>选项卡二的内容</TabItem>
  </Tabs>
)

storiesOf('Tabs', module)
  .add('Tabs', defaultTabs)
  .add('选项卡样式的Tabs', cardTabs)
  .add('自定义选项卡样式', customTabs)