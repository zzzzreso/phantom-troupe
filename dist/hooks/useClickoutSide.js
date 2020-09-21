import { useEffect } from 'react';
var useClickOutSide = function (ref, handler) {
    useEffect(function () {
        var listener = function (e) {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            handler(e);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
};
export default useClickOutSide;
