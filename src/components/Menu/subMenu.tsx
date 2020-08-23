import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import Transition from '../Transition/transition'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'

export interface SubMenuProps {
  index?: string;
  className?: string;
  title?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, className, title, children }) => {
  const context = useContext(MenuContext)
  // 检查数组，将默认为展开状态的submenu的drop设置为true
  const openSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpen = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false
  const [drop, setDrop] = useState(isOpen)

  //下拉菜单li类名
  const liClasses = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-vertical': context.mode === 'vertical',
    'is-opened': drop,
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('触发', context.index)
    setDrop(!drop)
    if (context.onSelect && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setDrop(toggle)
    }, 100);
  }

  // 纵向时点击菜单展开
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};

  // 横向时鼠标hover菜单展开
  const mouseEvents = context.mode === 'horizonal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {};

  //可下拉菜单内的子组件还是MenuItem
  const RenderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': drop,
      'is-active': context.index === index,
    })

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.warn('Warning: 这不是一个有效的menuitem元素')
      }
    })

    return (
      <Transition
        in={drop}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={liClasses} {...mouseEvents} >
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon className="arrow-icon" icon='angle-down' />
      </div>
      {RenderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu