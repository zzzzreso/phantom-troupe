import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

type ButtonSize = 'lg' | 'sm'
type ButtonType = 'default' | 'primary' | 'danger' | 'link'

interface ButtonBaseProps {
  className?: string,
  /**设置 Button 的禁用 */
  disabled?: boolean,
  /**设置 Button 的尺寸 */
  size?: ButtonSize,
  /**设置 Button 的类型 */
  btnType?: ButtonType,
  children: React.ReactNode,
  href?: string
}

// 获取button按钮和a链接的所有属性
type NativeButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLElement>
type AnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLElement>
// 将两者再次交叉，partial可以将所有属性设置为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorProps>

/**
 * 页面中最常用的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'imooc'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    disabled,
    size,
    btnType,
    children,
    href,
    ...restProps
  } = props

  let classes = classNames(
    'btn',
    className,
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      'disabled': (btnType === 'link') && disabled
    })
  if (href && btnType === 'link') {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;