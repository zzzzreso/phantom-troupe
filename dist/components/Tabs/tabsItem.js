import React from 'react';
export var TabItem = function (props) {
    var children = props.children;
    return React.createElement("div", { className: "phantom-tab-panel" }, children);
};
export default TabItem;
