import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
declare type ButtonSize = 'lg' | 'sm';
declare type ButtonType = 'default' | 'primary' | 'danger' | 'link';
interface ButtonBaseProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorProps>;
/**
 * 页面中最常用的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'phantom-troupe'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
