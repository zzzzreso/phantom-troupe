import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type animationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: animationName;
  wrapper?: boolean;
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props

  return (
    <CSSTransition
      classNames = { classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true,
}

export default Transition