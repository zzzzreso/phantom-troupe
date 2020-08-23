import React, { useState, DragEvent, useRef } from 'react'
import classNames from 'classnames'

export interface DraggerProps {
  onFile: (files: FileList) => void;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const [drag, setDrag] = useState(false)
  const { onFile, children } = props
  const dragElement = useRef<HTMLInputElement>(null)
  const classes = classNames('uploader-dragger', {
    'is-dragover': drag
  })

  const onDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDrag(true)
  }
  const handleLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDrag(false)
  }
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDrag(false)
    onFile(e.dataTransfer.files)
  }
  return (
    <div
      className={classes}
      onDragOver={onDragOver}
      onDragLeave={handleLeave}
      onDrop={handleDrop}
      ref={dragElement}
    >
      {children}
    </div>
  )
}

export default Dragger