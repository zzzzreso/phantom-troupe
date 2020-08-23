import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const defaultMenu = () => (
  <Menu
    defaultIndex='0'
    defaultOpenSubMenus={[]}
    mode="horizonal"
    onSelect={(index) => action(`clicked ${index} item`)}
  >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link2
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <SubMenu title="下拉选项">
      <MenuItem>
        下拉选项1
      </MenuItem>
      <MenuItem>
        下拉选项2
      </MenuItem>
    </SubMenu>
  </Menu>
)

const verticalMenu = () => (
  <Menu
    defaultIndex='0'
    defaultOpenSubMenus={[]}
    mode="vertical"
    onSelect={(index) => action(`clicked ${index} item`)}
  >
    <MenuItem>
      cool link
  </MenuItem>
    <MenuItem>
      cool link2
  </MenuItem>
    <MenuItem disabled>
      disabled
  </MenuItem>
    <SubMenu title="下拉选项">
      <MenuItem>
        下拉选项1
    </MenuItem>
      <MenuItem>
        下拉选项2
    </MenuItem>
    </SubMenu>
  </Menu>
)

const defaultOpenMenu = () => (
  <Menu
    defaultIndex='0'
    defaultOpenSubMenus={['3']}
    mode="vertical"
    onSelect={(index) => action(`clicked ${index} item`)}
  >
    <MenuItem>
      cool link
  </MenuItem>
    <MenuItem>
      cool link2
  </MenuItem>
    <MenuItem disabled>
      disabled
  </MenuItem>
    <SubMenu title="默认展开下拉选项">
      <MenuItem>
        下拉选项1
    </MenuItem>
      <MenuItem>
        下拉选项2
    </MenuItem>
    </SubMenu>
  </Menu>
)

storiesOf('Menu', module)
  .add('Menu', defaultMenu)
  .add('纵向的Menu', verticalMenu)
  .add('默认展开的纵向Menu', defaultOpenMenu)