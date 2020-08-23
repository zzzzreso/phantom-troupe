import React, { useState, useEffect, ChangeEvent } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button'
import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition'
import Input from './components/Input/input'
import AutoComplete, { DataSourceType } from './components/AutoComplete/autoComplete'
import axios from 'axios'
import Upload, { UploadFile } from './components/Upload/upload'
import Alert from './components/Alert/alert'

library.add(fas)
function App() {
  const [show, setShow] = useState(false)

  const fetchNames = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(data => {
        return data.items.slice(0, 10).map((it: any) => {
          return {
            value: it.login,
            ...it
          }
        })
      })
  }

  interface githubUserProp {
    value: string;
    id?: number;
    html_url?: string;
  }
  const showOptions = (item: DataSourceType<githubUserProp>) => {
    return (
      <div>
        <h2>Name: {item.value}</h2>
        <p>id: {item.id}</p>
        <p>url: {item.html_url}</p>
      </div>
    )
  }

  const progress = (percent: number, file: File) => {
    console.log(percent)
  }
  const test = (file: File) => {
    if (file.size / 1024 > 50) {
      alert('file too big')
      return false
    }
    return true
  }
  // 可以修改上传文件的信息
  const testPromise = (file: File) => {
    const newFile = new File([file], 'new_file', { type: file.type })
    return Promise.resolve(newFile)
  }
  const files: UploadFile[] = [
    { uid: '10086', name: 'fsfs', size: 55555, status: 'loading', percent: 50 },
    { uid: '10086212', name: 'fsfs2', size: 55555, status: 'success', percent: 50 },
    { uid: '102121', name: 'fsfs3', size: 55555, status: 'error', percent: 50 },
  ]
  return (
    <div className="App">
      <Alert title='test' closable={true} type='default' />
      <Icon icon='times' size="10x" />
      <header className="App-header">
        <AutoComplete
          fetchSuggestions={fetchNames}
          onSelect={console.log}
        // renderOption={showOptions}
        ></AutoComplete>
        <Input
          onChange={() => console.log(3)}
          defaultValue='fdfd'
          size="lg"
          icon='arrow-right'
          prepend='prepend'
          append='append' />
        <Button autoFocus onClick={(e) => { alert(3) }} className="fdfd">test</Button>
        <Button size='lg' btnType='primary' onClick={() => { setShow(!show) }}>Primary button</Button>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
        >
          <div>
            <p>A set of components for managing component states (including mounting and unmounting) over time, specifically designed with animation in mind.</p>
            <p>A set of components for managing component states (including mounting and unmounting) over time, specifically designed with animation in mind.</p>
            <p>A set of components for managing component states (including mounting and unmounting) over time, specifically designed with animation in mind.</p>
          </div>
        </Transition>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-top'
          wrapper
        >
          <Button size='lg' btnType='danger'>Large button</Button>
        </Transition>
      </header>
      <Upload
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        onProgress={progress}
        defaultFileList={files}
        onRemove={(file) => { console.log(file.name) }}
        accept='.jpg'
        headers={{ 'xxxx': 'fdfdfd' }}
        name='log-file'
        data={{ 'key': 'value', 'from': 'width' }}
        drag={true}
      >
        <Icon icon='upload' size='8x' />
        <p>上传文件</p>
      </Upload>
    </div >
  );
}

export default App;





