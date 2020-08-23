import React from 'react'
import { render, fireEvent, wait, RenderResult } from '@testing-library/react'
import AutoComplete, { AutoCompleteProps } from '../AutoComplete/autoComplete'

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => { return data.filter(item => item.value.includes(query)) },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}

const data = [
  { value: 'a', number: 1 },
  { value: 'ab', number: 2 },
  { value: 'cd', number: 3 },
  { value: 'bbc', number: 4 },
]

let wrapper: RenderResult,
  inputElement: HTMLInputElement
describe('AutoComplete component test', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputElement = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('测试菜单基本行为', async () => {
    // 输入
    fireEvent.change(inputElement, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.getByText('ab')).toBeInTheDocument()
    })
    // 根据数据应该显示两个结果
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // 点击第二个菜单
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 2 })
    expect(wrapper.queryByText('a')).not.toBeInTheDocument()
    // 输入框数据更改
    expect(inputElement.value).toBe('ab')
  })

  it('测试keydown事件', async () => {
    fireEvent.change(inputElement, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.getByText('ab')).toBeInTheDocument()
    })
    const firstChild = wrapper.queryByText('a')
    const secondChild = wrapper.queryByText('ab')
    // 向下
    fireEvent.keyDown(inputElement, { keyCode: 40 })
    expect(firstChild).toHaveClass('is-active')
    fireEvent.keyDown(inputElement, { keyCode: 40 })
    expect(secondChild).toHaveClass('is-active')
    fireEvent.keyDown(inputElement, { keyCode: 40 })
    expect(secondChild).toHaveClass('is-active')
    // 向上
    fireEvent.keyDown(inputElement, { keyCode: 38 })
    expect(firstChild).toHaveClass('is-active')
    fireEvent.keyDown(inputElement, { keyCode: 38 })
    expect(firstChild).toHaveClass('is-active')
    // 回车
    fireEvent.keyDown(inputElement, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'a', number: 1 })
    expect(wrapper.queryByText('a')).not.toBeInTheDocument()
  })

  it('测试clickoutside', async () => {
    fireEvent.change(inputElement, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.getByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
})