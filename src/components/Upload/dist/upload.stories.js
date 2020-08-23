"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@storybook/react");
var addon_actions_1 = require("@storybook/addon-actions");
var upload_1 = require("./upload");
var button_1 = require("../Button/button");
var icon_1 = require("../Icon/icon");
var simpleUpload = function () { return (react_1["default"].createElement(upload_1["default"], { action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', onChange: addon_actions_1.action('changed'), onSuccess: addon_actions_1.action('success'), onProgress: addon_actions_1.action('progress'), onRemove: addon_actions_1.action('removed') },
    react_1["default"].createElement(button_1["default"], { size: "lg", btnType: "primary" },
        react_1["default"].createElement(icon_1["default"], { icon: "upload" }),
        " \u70B9\u51FB\u4E0A\u4F20",
        " "))); };
var checkUpload = function () {
    var checkFileSize = function (file) {
        if (Math.round(file.size / 1024) > 50) {
            alert('file too big');
            return false;
        }
        return true;
    };
    return (react_1["default"].createElement(upload_1["default"], { action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', onChange: addon_actions_1.action('changed'), beforeUpload: checkFileSize },
        react_1["default"].createElement(button_1["default"], { size: "lg", btnType: "primary" },
            react_1["default"].createElement(icon_1["default"], { icon: "upload" }),
            " \u4E0D\u80FD\u4F20\u5927\u4E8E50Kb\uFF01",
            " ")));
};
var textCheck = "\n  ### \u793A\u4F8B\u4EE3\u7801\n  ~~~javascript\n  const checkFileSize = (file: File) => {\n    if (Math.round(file.size / 1024) > 50) {\n      alert('file too big')\n      return false;\n    }\n    return true;\n  }\n  return (\n    <Upload\n      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'\n      onChange={action('changed')}\n      beforeUpload={checkFileSize}\n    >\n      <Button size=\"lg\" btnType=\"primary\">\n        <Icon icon=\"upload\" /> \u4E0D\u80FD\u4F20\u5927\u4E8E50Kb\uFF01 {\" \"}\n      </Button>\n    </Upload>  \n  )\n  ~~~\n";
var dragUpload = function () { return (react_1["default"].createElement(upload_1["default"], { action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', onChange: addon_actions_1.action("changed"), onRemove: addon_actions_1.action("removed"), name: "fileName", multiple: true, drag: true },
    react_1["default"].createElement(icon_1["default"], { icon: "upload", size: "3x", theme: "secondary" }),
    react_1["default"].createElement("br", null),
    react_1["default"].createElement("p", null, "\u70B9\u51FB\u6216\u8005\u62D6\u52A8\u5230\u6B64\u533A\u57DF\u8FDB\u884C\u4E0A\u4F20"))); };
react_2.storiesOf("Upload", module)
    .add("Upload", simpleUpload)
    .add('上传前检查文件大小', checkUpload, { info: { source: false, text: textCheck } })
    .add('拖动上传', dragUpload);
