import React, { FC, ChangeEvent, useState, ReactElement, useEffect, KeyboardEvent, useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'
import useClickOutSide from '../../hooks/useClickoutSide'
import Transition from '../Transition/transition'

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 
   * Promisetype DataSourceType<T = {}> = T & DataSourceObject */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  /**	点击选中项时触发的回调 */
  onSelect?: (item: DataSourceType) => void
  /** 支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [drop, setDrop] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue, 300)
  
  //点击列表外时收起下拉菜单
  useClickOutSide(componentRef, () => {
    setSuggestions([])
  })
  
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      setSuggestions([])
      let res = fetchSuggestions(debounceValue)
      // 对返回结果进行判断，如果是异步操作，调用then
      if (res instanceof Promise) {
        setLoading(true)
        res.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setDrop(true)
          }
        })
      } else {
        setSuggestions(res)
        setDrop(true)
      }
    } else {
      setSuggestions([])
      setDrop(false)
    }
    setHighlightIndex(-1)
  }, [debounceValue])

  // 监听用户输入
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const fixIndex = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  // 监听用户用方向键选择菜单列表
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      //上方向键
      case 38:
        fixIndex(highlightIndex - 1)
        break
      //下方向键
      case 40:
        fixIndex(highlightIndex + 1)
        break
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 27:
        setSuggestions([])
        setDrop(false)
        break
      default:
        break
    }
  }

  // 点击选择列表项
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  // 根据用户自定义展示列表
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={(drop && suggestions.length > 0) || loading}
        timeout={200}
        animation='zoom-in-top'
      >
        <ul className='suggestion-list'>
          {loading &&
            <div className='suggstions-loading-icon'>
              <Icon icon='spinner' spin />
            </div>
          }
          {suggestions.map((item, index) => {
            const highlightClass = classNames('suggestion-item', {
              'is-active': highlightIndex === index
            })
            return (
              <li key={index} className={highlightClass} onClick={() => { handleSelect(item) }}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  return (
    <div
      className='auto-complete'
      onKeyDown={handleKeyDown}
      ref={componentRef}
    >
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete;