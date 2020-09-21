var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import Transition from '../Transition/transition';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
var SubMenu = function (_a) {
    var index = _a.index, className = _a.className, title = _a.title, children = _a.children;
    var context = useContext(MenuContext);
    // 检查数组，将默认为展开状态的submenu的drop设置为true
    var openSubMenus = context.defaultOpenSubMenus;
    var isOpen = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;
    var _b = useState(isOpen), drop = _b[0], setDrop = _b[1];
    //下拉菜单li类名
    var liClasses = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-vertical': context.mode === 'vertical',
        'is-opened': drop,
    });
    var handleClick = function (e) {
        e.preventDefault();
        console.log('触发', context.index);
        setDrop(!drop);
        if (context.onSelect && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setDrop(toggle);
        }, 100);
    };
    // 纵向时点击菜单展开
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    // 横向时鼠标hover菜单展开
    var mouseEvents = context.mode === 'horizonal' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    //可下拉菜单内的子组件还是MenuItem
    var RenderChildren = function () {
        var subMenuClasses = classNames('submenu', {
            'menu-opened': drop,
            'is-active': context.index === index,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index + "-" + i
                });
            }
            else {
                console.warn('Warning: 这不是一个有效的menuitem元素');
            }
        });
        return (React.createElement(Transition, { in: drop, timeout: 300, animation: 'zoom-in-top' },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: liClasses }, mouseEvents),
        React.createElement("div", __assign({ className: 'submenu-title' }, clickEvents),
            title,
            React.createElement(Icon, { className: "arrow-icon", icon: 'angle-down' })),
        RenderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
