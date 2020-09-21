import { FC } from 'react';
import { TabsProps } from './tabs';
import { TabItemProps } from './tabsItem';
export declare type ITabComponent = FC<TabsProps> & {
    Item: FC<TabItemProps>;
};
declare const TransTabs: ITabComponent;
export default TransTabs;
