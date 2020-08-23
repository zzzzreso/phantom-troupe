import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type size = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: size
  /**是否禁用 Input */
  disabled?: boolean
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ~~~js
 * // 这样引用
 * import { Input } from 'phantom'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: React.FC<InputProps> = (props) => {
  const {
    size,
    disabled,
    icon,
    prepend,
    append,
    className,
    style,
    ...restProps
  } = props

  const classes = classNames('input-wrapper', className, {
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append,
    [`input-size-${size}`]: size,
  })

  // 使用useState没有传递参数时，修改错误
  const fixControlledValue = (value: any) => {
    if (value === undefined || value === null) {
      return ''
    }
    return value
  }

  // 如果使用了value，即设定为受控组件，此时不能再使用defaultValue
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className='input-group-prepend'>{prepend}</div>}
      {icon && <div className='icon-wrapper'><Icon icon={icon} /></div>}
      <input
        className='input-inner'
        disabled={disabled}
        {...restProps}
      />
      {append && <div className='input-group-append'>{append}</div>}
    </div>
  )
}

export default Input;