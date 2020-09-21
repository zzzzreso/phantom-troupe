import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
var MenuItem = function (props) {
    //通过useContext获得MenuContext.Provider中传入value的对象
    var context = useContext(MenuContext);
    var index = props.index, className = props.className, disabled = props.disabled, children = props.children, style = props.style;
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    //点击子组件可以触发父组件传入的函数
    var handleClick = function () {
        console.log('点击li');
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { onClick: handleClick, className: classes, style: style }, children));
};
MenuItem.displayName = 'MenuItem';
MenuItem.defaultProps = {
    index: '0',
    disabled: false
};
export default MenuItem;
