import React, { useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizonal' | 'vertical'

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

export const MenuContext = React.createContext<IMenuContext>({ index: "0" })

export const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, style, mode, className, children, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizonal': mode !== 'vertical',
  })

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus, 
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      //需要从child中拿到displayName属性的值
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 给每个子元素添加上index props
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.warn('Warning: 这不是一个有效的menuitem元素')
      }
    })
  }


  return (
    <ul className={classes} style={style} data-testid="menu-test">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizonal',
  defaultOpenSubMenus: [],
}

export default Menu