import { FC } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type themeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    /**支持框架主题 根据主题显示不同的颜色 */
    theme?: themeProps;
}
export declare const Icon: FC<IconProps>;
export default Icon;
