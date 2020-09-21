import React, { useState } from 'react';
import classNames from 'classnames';
/**
 * 选项卡切换组件。 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'phantom'
 * ~~~
 */
export var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, type = props.type, children = props.children;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('phantom-tabs-nav', className, {
        'nav-line': type === 'line',
        'nav-card': type === 'card'
    });
    var handleClick = function (e, index, disabled) {
        if (!disabled) {
            setActive(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var classes = classNames("phantom-tabs-nav-item", {
                "is-active": currentActive === index,
                'disabled': disabled,
            });
            return (React.createElement("li", { className: classes, key: "nav-item-" + index, onClick: function (e) {
                    handleClick(e, index, disabled);
                } }, label));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === currentActive) {
                return child;
            }
        });
    };
    return (React.createElement("div", null,
        React.createElement("ul", { className: classes }, renderChildren()),
        React.createElement("div", { className: "phantom-tabs-content" }, renderContent())));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line'
};
export default Tabs;
