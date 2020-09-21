import React, { useState, useRef } from 'react';
import classNames from 'classnames';
var Dragger = function (props) {
    var _a = useState(false), drag = _a[0], setDrag = _a[1];
    var onFile = props.onFile, children = props.children;
    var dragElement = useRef(null);
    var classes = classNames('uploader-dragger', {
        'is-dragover': drag
    });
    var onDragOver = function (e) {
        e.preventDefault();
        setDrag(true);
    };
    var handleLeave = function (e) {
        e.preventDefault();
        setDrag(false);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDrag(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: classes, onDragOver: onDragOver, onDragLeave: handleLeave, onDrop: handleDrop, ref: dragElement }, children));
};
export default Dragger;
