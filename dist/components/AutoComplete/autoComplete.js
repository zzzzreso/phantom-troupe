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
import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOutSide from '../../hooks/useClickoutSide';
import Transition from '../Transition/transition';
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), drop = _d[0], setDrop = _d[1];
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debounceValue = useDebounce(inputValue, 300);
    //点击列表外时收起下拉菜单
    useClickOutSide(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([]);
            var res = fetchSuggestions(debounceValue);
            // 对返回结果进行判断，如果是异步操作，调用then
            if (res instanceof Promise) {
                setLoading(true);
                res.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setDrop(true);
                    }
                });
            }
            else {
                setSuggestions(res);
                setDrop(true);
            }
        }
        else {
            setSuggestions([]);
            setDrop(false);
        }
        setHighlightIndex(-1);
    }, [debounceValue]);
    // 监听用户输入
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var fixIndex = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    // 监听用户用方向键选择菜单列表
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            //上方向键
            case 38:
                fixIndex(highlightIndex - 1);
                break;
            //下方向键
            case 40:
                fixIndex(highlightIndex + 1);
                break;
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 27:
                setSuggestions([]);
                setDrop(false);
                break;
            default:
                break;
        }
    };
    // 点击选择列表项
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    // 根据用户自定义展示列表
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: (drop && suggestions.length > 0) || loading, timeout: 200, animation: 'zoom-in-top' },
            React.createElement("ul", { className: 'suggestion-list' },
                loading &&
                    React.createElement("div", { className: 'suggstions-loading-icon' },
                        React.createElement(Icon, { icon: 'spinner', spin: true })),
                suggestions.map(function (item, index) {
                    var highlightClass = classNames('suggestion-item', {
                        'is-active': highlightIndex === index
                    });
                    return (React.createElement("li", { key: index, className: highlightClass, onClick: function () { handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: 'auto-complete', onKeyDown: handleKeyDown, ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
