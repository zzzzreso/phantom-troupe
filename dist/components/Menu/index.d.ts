import { FC } from 'react';
import { MenuProps } from './menu';
import { SubMenuProps } from './subMenu';
import { MenuItemProps } from './menuItem';
export declare type IMenuComponent = FC<MenuProps> & {
    Item: FC<SubMenuProps>;
    SubMenu: FC<MenuItemProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
