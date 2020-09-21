import React, { FC, useState, FunctionComponentElement, MouseEvent } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabsItem'

type TabsType = 'line' | 'card'
export interface TabsProps {
  /** 当前激活 tab 面板的 index，默认为0*/
  defaultIndex?: number
  /** 可以扩展的 className*/
  className?: string
  /** 点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: number) => void
  /** Tabs的样式，两种可选，默认为line*/
  type?: TabsType
}

/**
 * 选项卡切换组件。 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 * 
 * ~~~js
 * import { Tabs } from 'phantom-troupe'
 * ~~~
 */

export const Tabs: FC<TabsProps> = (props) => {
  const {
    defaultIndex,
    className,
    onSelect,
    type,
    children
  } = props
  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('phantom-tabs-nav', className, {
    'nav-line': type === 'line',
    'nav-card': type === 'card'
  })

  const handleClick = (e: MouseEvent, index: number, disabled: boolean | undefined) => {
    if (!disabled) {
      setActive(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props
      const classes = classNames("phantom-tabs-nav-item", {
        "is-active": currentActive === index,
        'disabled': disabled,
      });

      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => {
            handleClick(e, index, disabled)
          }}
        >
          {label}
        </li>
      )
    })
  }

  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === currentActive) {
        return child;
      }
    });
  }

  return (
    <div>
      <ul className={classes}>
        {renderChildren()}
      </ul>
      <div className="phantom-tabs-content">
        {renderContent()}
      </div>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line'
}

export default Tabs;