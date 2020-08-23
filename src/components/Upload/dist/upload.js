"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Upload = void 0;
var react_1 = require("react");
var axios_1 = require("axios");
var uploadList_1 = require("./uploadList");
var dragger_1 = require("./dragger");
exports.Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, multiple = props.multiple, accept = props.accept, children = props.children, drag = props.drag;
    var inputRef = react_1.useRef(null);
    var _a = react_1.useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    //由于React使用Object.is来比较state,所以需要自己更新对象信息
    //updateFile: 要更新的某个对象，updateObj：更新后的新属性组成的对象
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (preList) {
            return preList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    // 上传之前可以先对文件进行检测
    var upLoadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                postFile(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (data) {
                        postFile(data);
                    });
                }
                else if (result !== false) {
                    postFile(file);
                }
            }
        });
    };
    var postFile = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file,
            response: null,
            error: null
        };
        // 添加所有曾经上传过的文件信息
        // 文件上传是异步过程，应该使用函数式更新
        // setFileList([_file, ...fileList])
        setFileList(function (preList) {
            return __spreadArrays([_file], preList);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        //发送请求
        axios_1["default"].post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, {
                        status: 'loading',
                        percent: percentage
                    });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (res) {
            console.log(res);
            updateFileList(_file, {
                status: 'success',
                response: res.data
            });
            if (onSuccess) {
                onSuccess(res.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        })["catch"](function (err) {
            console.log(err);
            updateFileList(_file, {
                status: 'error',
                error: err
            });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    console.log(fileList);
    var handleChange = function (e) {
        var files = e.target.files;
        console.log(files);
        if (files) {
            upLoadFiles(files);
        }
    };
    //删除某一项文件
    var handleRemove = function (file) {
        setFileList(function (preFileList) {
            return preFileList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    return (react_1["default"].createElement("div", { className: 'upload-component' },
        react_1["default"].createElement("div", { className: 'upload-input', onClick: handleClick }, drag ?
            react_1["default"].createElement(dragger_1["default"], { onFile: function (files) { upLoadFiles(files); } }, children) : children),
        react_1["default"].createElement("input", { className: 'file-input', style: { display: 'none' }, onChange: handleChange, ref: inputRef, type: "file", multiple: multiple, accept: accept }),
        react_1["default"].createElement(uploadList_1["default"], { fileList: fileList, onRemove: handleRemove })));
};
exports.Upload.defaultProps = {
    name: 'file'
};
exports["default"] = exports.Upload;
