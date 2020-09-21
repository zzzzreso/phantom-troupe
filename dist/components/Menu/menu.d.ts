import React from 'react';
declare type MenuMode = 'horizonal' | 'vertical';
export interface MenuProps {
    /**默认被选中的选项的索引值 */
    defaultIndex?: string;
    style?: React.CSSProperties;
    /**菜单类型 横向或纵向 */
    mode?: MenuMode;
    className?: string;
    /**点击菜单项触发的回调函数 */
    onSelect?: (selectedIndex: string) => void;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
export declare const Menu: React.FC<MenuProps>;
export default Menu;
