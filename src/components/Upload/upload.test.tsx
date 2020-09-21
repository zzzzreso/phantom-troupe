import { render, fireEvent, RenderResult, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Upload, { UploadProps } from './upload'
import axios from 'axios'

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    const { icon, onClick } = props
    return <span onClick={onClick}>{icon}</span>
  }
})
jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const testProps: UploadProps = {
  action: 'fakeUrl',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn()
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['test'], 'test.jpg', { type: 'image/jpg' })
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })

  it('测试上传文件', async () => {
    mockedAxios.post.mockResolvedValue({ 'data': 'test' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(wrapper.container.querySelector('.file-status')).toBeInTheDocument()
    await wait(() => {
      expect(wrapper.queryByText('test.jpg')).toBeInTheDocument()
    })
    expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('test', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)

    // 点击删除文件
    expect(wrapper.queryByText('times-circle')).toBeInTheDocument()
    fireEvent.click(wrapper.queryByText('times-circle')!)
    expect(wrapper.queryByText('test.jpg')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.jpg'
      })
    )
  })
})
