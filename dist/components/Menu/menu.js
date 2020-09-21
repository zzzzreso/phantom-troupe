import React, { useState } from 'react';
import classNames from 'classnames';
export var MenuContext = React.createContext({ index: "0" });
export var Menu = function (props) {
    var defaultIndex = props.defaultIndex, style = props.style, mode = props.mode, className = props.className, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizonal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            // 需要从child中拿到displayName属性的值
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 给每个子元素添加上index props
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.warn('Warning: 这不是一个有效的menuitem元素');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "menu-test" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizonal',
    defaultOpenSubMenus: [],
};
export default Menu;
