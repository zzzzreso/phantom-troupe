import { render, fireEvent } from '@testing-library/react'
import { ButtonProps } from './button'
import Button from './button'
import React from 'react'

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  size: 'lg',
  btnType: 'danger',
  className: 'btn-test',
}

const linkProps: ButtonProps = {
  btnType: 'link',
  size: 'sm',
  href: "https://www.baidu.com"
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const btn = render(<Button {...defaultProps}>test</Button>)
    const ele = btn.getByText('test') as HTMLButtonElement
    expect(ele).toBeInTheDocument()
    expect(ele.tagName).toEqual('BUTTON')
    expect(ele).toHaveClass('btn-default')
    fireEvent.click(ele)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  
  it('should render the correct component based on different props', () => {
    const btn = render(<Button {...testProps}>test</Button>)
    const ele = btn.getByText('test') as HTMLButtonElement
    expect(ele).toBeInTheDocument()
    expect(ele).toHaveClass('btn-danger btn-test btn-lg')
  })

  it('should render a link when btnType is link and href is provided', () => {
    const btn = render(<Button {...linkProps}>link</Button>)
    const ele = btn.getByText('link') as HTMLAnchorElement
    expect(ele).toBeInTheDocument()
    expect(ele.tagName).toEqual('A')
    expect(ele).toHaveClass('btn-link btn-sm')
    expect(ele.href).toBeTruthy()
  })

  it('should render disabled button when disabled set to true', () => {
    const btn = render(<Button data-testid="disabled" {...disabledProps}>disabled</Button>)
    const ele = btn.getByTestId('disabled') as HTMLButtonElement
    expect(ele).toBeInTheDocument()
    expect(ele.disabled).toBeTruthy()
    fireEvent.click(ele)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
