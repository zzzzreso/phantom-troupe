import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './input'

const ControlledInput = () => {
  const [value, setValue] = useState('')
  return <Input value={value} defaultValue={value} onChange={(e) => { setValue(e.target.value) }} />
}

const defaultInput = () => (
  <Input
    placeholder='default input'
    onChange={action('changed')}
  />
)

const disabledInput = () => (
  <Input
    disabled
    placeholder='disabled input'
  />
)

const iconInput = () => (
  <Input
    icon='water'
    placeholder='input with icon'
  />
)

const sizeInput = () => (
  <>
    <Input
      size='lg'
      placeholder='lg input'
    />
    <Input
      size='sm'
      placeholder='sm input'
    />
  </>
)

const pandInput = () => (
  <>
    <Input
      icon='search'
      prepend='https://'
      placeholder='prepend text'
    />
    <Input
      append='.com'
      placeholder='google'
    />
  </>
)



storiesOf('Input', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后缀的 Input', pandInput)