import React, { FC } from 'react';
export interface TabItemProps {
    /** 选项卡上的文字 */
    label: string | React.ReactElement;
    /** Tab选项是否被禁用 */
    disabled?: boolean;
}
export declare const TabItem: FC<TabItemProps>;
export default TabItem;
