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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'phantom'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export var Input = function (props) {
    var _a;
    var size = props.size, disabled = props.disabled, icon = props.icon, prepend = props.prepend, append = props.append, className = props.className, style = props.style, restProps = __rest(props, ["size", "disabled", "icon", "prepend", "append", "className", "style"]);
    var classes = classNames('input-wrapper', className, (_a = {
            'is-disabled': disabled,
            'input-group': prepend || append,
            'input-group-prepend': !!prepend,
            'input-group-append': !!append
        },
        _a["input-size-" + size] = size,
        _a));
    // 使用useState没有传递参数时，修改错误
    var fixControlledValue = function (value) {
        if (value === undefined || value === null) {
            return '';
        }
        return value;
    };
    // 如果使用了value，即设定为受控组件，此时不能再使用defaultValue
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (React.createElement("div", { className: classes, style: style },
        prepend && React.createElement("div", { className: 'input-group-prepend' }, prepend),
        icon && React.createElement("div", { className: 'icon-wrapper' },
            React.createElement(Icon, { icon: icon })),
        React.createElement("input", __assign({ className: 'input-inner', disabled: disabled }, restProps)),
        append && React.createElement("div", { className: 'input-group-append' }, append)));
};
export default Input;
