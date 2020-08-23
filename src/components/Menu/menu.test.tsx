import React from 'react'
import { render, fireEvent, RenderResult, cleanup, wait } from '@testing-library/react'
import { MenuProps } from './menu'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: 'test',
}

const modeProps: MenuProps = {
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          dropdown-1
        </MenuItem>
        <MenuItem>
          dropdown-2
        </MenuItem>
      </SubMenu>
      <MenuItem>
        333
      </MenuItem>
    </Menu>
  )
}

const createStyle = () => {
  const cssFile = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  disabledElement: HTMLElement,
  activeElement: HTMLElement
describe('Menu component test', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyle())
    menuElement = wrapper.getByTestId('menu-test')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('测试组件基本属性', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('测试点击事件', () => {
    //拿到其中一个item,测试点击该li的结果
    //类名的改变，click函数是否被调用
    const thirdItem = wrapper.getByText('333')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('menu-item is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('3')
    //测试点击disabled的li
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('测试mode属性', () => {
    //由于beforeEach中已经创建了组件，此处先清除
    //每个it会在回调函数的末尾调用cleanup，清除当前创建的变量
    cleanup()
    const wrapper = render(generateMenu(modeProps))
    const menuElement = wrapper.getByTestId('menu-test')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('测试菜单展开', async () => {
    const subMenuItem = wrapper.queryByText('dropdown-1')
    const dropDownElement = wrapper.getByText('dropdown')
    expect(subMenuItem).not.toBeVisible()
    fireEvent.mouseEnter(dropDownElement)
    await wait(() => {
      expect(subMenuItem).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('dropdown-2'))
    expect(testProps.onSelect).toHaveBeenCalledWith('2-1')

    fireEvent.mouseLeave(dropDownElement) 
    await wait(() => {
      expect(subMenuItem).not.toBeVisible()
    })
  })

})
