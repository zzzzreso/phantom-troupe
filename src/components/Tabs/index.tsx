import { FC } from 'react'
import Tabs, { TabsProps } from './tabs'
import TabItem, { TabItemProps } from './tabsItem'

export type ITabComponent = FC<TabsProps> & {
  Item: FC<TabItemProps>
}
const TransTabs = Tabs as ITabComponent
TransTabs.Item = TabItem

export default TransTabs;