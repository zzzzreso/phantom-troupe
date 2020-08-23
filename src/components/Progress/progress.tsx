import React from 'react'
import { themeProps } from '../Icon/icon'

export interface ProgressProps {
  percent: number; 
  strokeHeight?: number; //进度条高度
  showText?: boolean; //是否显示进度百分比
  styles?: React.CSSProperties; 
  theme?: themeProps; //进度条主题颜色
}

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props

  return (
    <div className='progress-bar' style={styles}>
      <div className='progress-bar-outer' style={{ height: `${strokeHeight}px` }}>
        <div
          className={`progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}>
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  percent: 0,
  showText: true,
  strokeHeight: 30,
  theme: 'primary',
}

export default Progress