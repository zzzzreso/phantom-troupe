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
import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button/button';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import Input from './components/Input/input';
import AutoComplete from './components/AutoComplete/autoComplete';
import Upload from './components/Upload/upload';
import Alert from './components/Alert/alert';
import { Tabs } from './components/Tabs/tabs';
import { TabItem } from './components/Tabs/tabsItem';
library.add(fas);
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var fetchNames = function (query) {
        return fetch("https://api.github.com/search/users?q=" + query)
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data.items.slice(0, 10).map(function (it) {
                return __assign({ value: it.login }, it);
            });
        });
    };
    var progress = function (percent, file) {
        console.log(percent);
    };
    // const test = (file: File) => {
    //   if (file.size / 1024 > 50) {
    //     alert('file too big')
    //     return false
    //   }
    //   return true
    // }
    // // 可以修改上传文件的信息
    // const testPromise = (file: File) => {
    //   const newFile = new File([file], 'new_file', { type: file.type })
    //   return Promise.resolve(newFile)
    // }
    var files = [
        { uid: '10086', name: 'fsfs', size: 55555, status: 'loading', percent: 50 },
        { uid: '10086212', name: 'fsfs2', size: 55555, status: 'success', percent: 50 },
        { uid: '102121', name: 'fsfs3', size: 55555, status: 'error', percent: 50 },
    ];
    return (React.createElement("div", { className: "App" },
        React.createElement(Alert, { title: 'test', closable: true, type: 'default' }),
        React.createElement(Icon, { icon: 'times', size: "10x" }),
        React.createElement("header", { className: "App-header" },
            React.createElement(AutoComplete, { fetchSuggestions: fetchNames, onSelect: console.log }),
            React.createElement(Input, { onChange: function () { return console.log(3); }, defaultValue: 'fdfd', size: "lg", icon: 'arrow-right', prepend: 'prepend' }),
            React.createElement(Button, { autoFocus: true, onClick: function (e) { alert(3); }, className: "fdfd" }, "test"),
            React.createElement(Button, { size: 'lg', btnType: 'primary', onClick: function () { setShow(!show); } }, "Primary button"),
            React.createElement(Transition, { in: show, timeout: 300, animation: 'zoom-in-left' },
                React.createElement("div", null,
                    React.createElement("p", null, "A set of components for managing component states (including mounting and unmounting) over time, specifically designed with animation in mind."),
                    React.createElement("p", null, "A set of components for managing component states (including mounting and unmounting) over time, specifically designed with animation in mind."),
                    React.createElement("p", null, "A set of components for managing component states (including mounting and unmounting) over time, specifically designed with animation in mind."))),
            React.createElement(Transition, { in: show, timeout: 300, animation: 'zoom-in-top', wrapper: true },
                React.createElement(Button, { size: 'lg', btnType: 'danger' }, "Large button"))),
        React.createElement(Upload, { action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', onProgress: progress, defaultFileList: files, onRemove: function (file) { console.log(file.name); }, accept: '.jpg', headers: { 'xxxx': 'fdfdfd' }, name: 'log-file', data: { 'key': 'value', 'from': 'width' }, drag: true },
            React.createElement(Icon, { icon: 'upload', size: '8x' }),
            React.createElement("p", null, "\u4E0A\u4F20\u6587\u4EF6")),
        React.createElement(Tabs, { onSelect: function (index) { console.log(index); } },
            React.createElement(TabItem, { label: 'tab1' }, "tab1"),
            React.createElement(TabItem, { label: 'tab2' }, "tab2"),
            React.createElement(TabItem, { label: 'tab3' }, "tab3"))));
}
export default App;
