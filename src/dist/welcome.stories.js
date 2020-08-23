"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@storybook/react");
react_2.storiesOf('welcome page', module).add('欢迎使用', function () {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, "\u6B22\u8FCE\u4F7F\u7528\u7EC4\u4EF6"),
        react_1["default"].createElement("h3", null, "\u5B89\u88C5\u8BD5\u8BD5"),
        react_1["default"].createElement("code", null, "npm install phantom-troupe -S")));
}, { info: { disable: true } });
