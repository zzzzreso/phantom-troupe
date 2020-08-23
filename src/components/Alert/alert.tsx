import React, { FC, useState } from 'react'
import classNames from 'classnames'
import Transition from '../Transition/transition'

export type AlertType = 'default' | 'success' | 'danger' | 'warning'

interface AlertProps {
  /**标题 */
  title: string
  /**描述 */
  description?: string
  /**类型 四种可选 */
  type: AlertType
  /**关闭Alert时触发的事件 */
  onClose?: () => void
  /**是否显示关闭图标 */
  closable?: boolean
}

export const Alert: FC<AlertProps> = (props) => {
  const [show, setShow] = useState(false)

  const {
    title,
    description,
    type,
    onClose,
    closable,
  } = props

  const classes = classNames('phantom-alert', {
    [`phantom-alert-${type}`]: type
  })

  const titleClass = classNames('phantom-alert-title', {
    'bold-title': description
  })

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onClose) {
      onClose()
    }
    setShow(true)
  }

  return (
    <Transition in={!show} timeout={300} animation='zoom-in-top'>
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className='phantom-alert-desc'>{description}</p>}
        {closable && (
          <span className="phantom-alert-close" onClick={handleClose}>
            ×
          </span>
        )}
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  type: 'default',
  closable: true
}

export default Alert;