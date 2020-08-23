import { render, fireEvent, RenderResult, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Upload, { UploadProps } from './upload'
import axios from 'axios'

jest.mock('../Icon/icon', () => {
  return ({ icon }) => {
    return <span>{icon}</span>
  }
})
jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const testProps: UploadProps = {
  action: 'fakeUrl',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['test'], 'test.jpg', { type: '.jpg' })
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })

  it('test upload', async () => {
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
  })
})
