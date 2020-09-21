import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type animationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
declare type TransitionProps = CSSTransitionProps & {
    animation?: animationName;
    wrapper?: boolean;
};
declare const Transition: React.FC<TransitionProps>;
export default Transition;
