import React from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progress/progress'

export interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove,
  } = props

  return (
    <ul className='upload-list'>
      {fileList.map(item => {
        return (
          <li className='upload-list-item' key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon='file' />
            </span>
            {item.name}
            <span className='file-status'>
              {item.status === 'loading' && <Icon icon='spinner' spin />}
              {item.status === 'success' && <Icon icon='check-circle' theme='success' />}
              {item.status === 'error' && <Icon icon='times-circle' theme='danger' />}
            </span>
            <span className="file-actions">
              <Icon icon='times-circle' onClick={() => { onRemove(item) }} />
            </span>
            {item.status === 'loading' && 
              <Progress 
                percent={item.percent || 0}
              />
            }
            {item.status === 'success' && 
              <Progress 
                percent={item.percent || 100}
                theme='success'
              />
            }
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList