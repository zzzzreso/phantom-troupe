import React, { useState } from 'react';
import classNames from 'classnames';
import Transition from '../Transition/transition';
export var Alert = function (props) {
    var _a;
    var _b = useState(false), show = _b[0], setShow = _b[1];
    var title = props.title, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable;
    var classes = classNames('phantom-alert', (_a = {},
        _a["phantom-alert-" + type] = type,
        _a));
    var titleClass = classNames('phantom-alert-title', {
        'bold-title': description
    });
    var handleClose = function (e) {
        e.preventDefault();
        if (onClose) {
            onClose();
        }
        setShow(true);
    };
    return (React.createElement(Transition, { in: !show, timeout: 300, animation: 'zoom-in-top' },
        React.createElement("div", { className: classes },
            React.createElement("span", { className: titleClass }, title),
            description && React.createElement("p", { className: 'phantom-alert-desc' }, description),
            closable && (React.createElement("span", { className: "phantom-alert-close", onClick: handleClose }, "\u00D7")))));
};
Alert.defaultProps = {
    type: 'default',
    closable: true
};
export default Alert;
