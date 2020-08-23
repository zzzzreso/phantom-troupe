import React, { useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'
import Dragger from './dragger'

type fileStatus = 'ready' | 'loading' | 'success' | 'error'
//创建文件类型
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: fileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  /** 必填参数，上传文件的地址 */
  action: string
  /** 默认展示上传的文件列表 */
  defaultFileList?: UploadFile[]
  /** 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /** 文件上传时的钩子 */
  onProgress?: (percent: number, file: File) => void
  /** 文件上传成功时的钩子 */
  onSuccess?: (data: any, file: File) => void
  /** 文件上传失败时的钩子 */
  onError?: (err: any, file: File) => void
  /** 文件状态改变时的钩子，上传成功或者失败时都会被调用 */
  onChange?: (file: File) => void
  /** 文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void
  /** 设置上传的请求头部 */
  headers?: { [key: string]: any }
  /** 上传的文件字段名 */
  name?: string; //可能的接口字段
  /** 上传时附带的额外参数 */
  data?: { [key: string]: any }
  /** 支持发送 cookie 凭证信息 */
  withCredentials?: boolean
  /** 是否支持多选文件 */
  multiple?: boolean
  /** 可选参数, 接受上传的文件类型 */
  accept?: string
  /** 是否支持拖拽上传 */
  drag?: boolean
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    multiple,
    accept,
    children,
    drag,
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  //由于React使用Object.is来比较state,所以需要自己更新对象信息
  //updateFile: 要更新的某个对象，updateObj：更新后的新属性组成的对象
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(preList => {
      return preList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  // 上传之前可以先对文件进行检测
  const upLoadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        postFile(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(data => {
            postFile(data)
          })
        } else if (result !== false) {
          postFile(file)
        }
      }
    })
  }

  const postFile = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      size: file.size,
      name: file.name,
      status: 'ready',
      percent: 0,
      raw: file,
      response: null,
      error: null
    }
    // 添加所有曾经上传过的文件信息
    // 文件上传是异步过程，应该使用函数式更新
    // setFileList([_file, ...fileList])
    setFileList(preList => {
      return [_file, ...preList]
    })
    let formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }

    //发送请求
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, {
            status: 'loading',
            percent: percentage,
          })
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then(res => {
      console.log(res)
      updateFileList(_file, {
        status: 'success',
        response: res.data
      })
      if (onSuccess) {
        onSuccess(res.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    }).catch(err => {
      console.log(err)
      updateFileList(_file, {
        status: 'error',
        error: err
      })
      if (onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      }
    })
  }
  console.log(fileList)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log(files)
    if (files) {
      upLoadFiles(files)
    }
  }

  //删除某一项文件
  const handleRemove = (file: UploadFile) => {
    setFileList(preFileList => {
      return preFileList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  return (
    <div className='upload-component'>
      <div
        className='upload-input'
        onClick={handleClick}
      >
        {drag ?
          <Dragger onFile={(files) => { upLoadFiles(files) }}>
            {children}
          </Dragger> : children
        }
      </div>
      <input
        className='file-input'
        style={{ display: 'none' }}
        onChange={handleChange}
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
      />
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload;