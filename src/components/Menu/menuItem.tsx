import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  //通过useContext获得MenuContext.Provider中传入value的对象
  const context = useContext(MenuContext)
  const { index, className, disabled, children, style } = props
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  //点击子组件可以触发父组件传入的函数
  const handleClick = () => {
    console.log('点击li')
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li onClick={handleClick} className={classes} style={style}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
MenuItem.defaultProps = {
  index: '0',
  disabled: false
}

export default MenuItem