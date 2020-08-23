import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete, { DataSourceType } from './autoComplete'

interface LegendProps {
  value: string;
  number: number
}

interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}

const simpleComplete = () => {
  const names = [
    'Annie',
    'Ashe',
    'Brand',
    'Blitzcrank',
    'Corki',
    'Diana',
    'Delevin',
    'Ezreal',
    'Fizz',
    'Fiora',
    'Galio',
    'Garen',
    'Jax',
    'Kassadin',
    'Lee sin',
    'lulu',
    'Malzahar',
    'MissFortune',
    'Vayne',
    'Zed'
  ]

  const handleFetch = (query: string) => {
    return names.filter(name => name.includes(query)).map(name => ({ value: name }))
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      placeholder='请输入英雄名字'
    />
  )
}

const textComplete = `
  ~~~javascript
  const names = ['Annie','Ashe','Brand','Blitzcrank','Corki','Diana','Delevin','Ezreal','Fizz',
  'Fiora','Galio','Garen','Jax','Kassadin','Lee sin','lulu','Malzahar','MissFortune','Vayne','Zed']
  const handleFetch = (query: string) => {
    return names.filter(name => name.includes(query)).map(name => ({ value: name }))
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action(name)}
      placeholder='请输入英雄名字'
    />
  )
  ~~~
`;

const customComplete = () => {
  const nameWithNumber = [
    { value: 'Annie', number: 1 },
    { value: 'Ashe', number: 2 },
    { value: 'Brand', number: 3 },
    { value: 'Blitzcrank', number: 4 },
    { value: 'Corki', number: 5 },
    { value: 'Diana', number: 6 },
    { value: 'Delevin', number: 7 },
    { value: 'Ezreal', number: 8 },
    { value: 'Fizz', number: 9 },
    { value: 'Fiora', number: 10 },
    { value: 'Galio', number: 11 },
    { value: 'Garen', number: 12 },
    { value: 'Jax', number: 13 },
  ]

  const handleFetch = (query: string) => {
    return nameWithNumber.filter(item => item.value.includes(query))
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LegendProps>
    return (
      <>
        <b>名字：{itemWithNumber.value}</b>
        <span>编号：{itemWithNumber.number}</span>
      </>
    )
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      placeholder="输入英雄名字,自定义下拉模版"
      renderOption={renderOption}
    />
  )
}

const textCustom = `
  ### 示例代码
  ~~~javascript
  const customComplete = () => {
    const nameWithNumber = [
      { value: 'Annie', number: 1 },
      { value: 'Ashe', number: 2 },
      { value: 'Brand', number: 3 },
      { value: 'Blitzcrank', number: 4 },
      { value: 'Corki', number: 5 },
      { value: 'Diana', number: 6 },
      { value: 'Delevin', number: 7 },
      { value: 'Ezreal', number: 8 },
      { value: 'Fizz', number: 9 },
      { value: 'Fiora', number: 10 },
      { value: 'Galio', number: 11 },
      { value: 'Garen', number: 12 },
      { value: 'Jax', number: 13 },
    ]
  
    const handleFetch = (query: string) => {
      return nameWithNumber.filter(item => item.value.includes(query))
    }
    const renderOption = (item: DataSourceType) => {
      const itemWithNumber = item as DataSourceType
      return (
        <>
          <b>名字：{itemWithNumber.value}</b>
          <span>编号：{itemWithNumber.number}</span>
        </>
      )
    }
    return (
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action('selected')}
        placeholder="输入英雄名字,自定义下拉模版"
        renderOption={renderOption}
      />
    )
  }  
  ~~~
`

const ajaxComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
      })
  }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    );
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("selected")}
      renderOption={renderOption}
      placeholder="输入 Github 用户名试试"
    />
  )
}

const textAjax = `
  ### 示例代码
  ~~~javascript
  const handleFetch = (query: string) => {
    return fetch('https://api.github.com/search/users?q='+ query)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    )
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
      placeholder="输入 Github 用户名试试"
    />
  )
  ~~~
`

storiesOf('AutoComplete', module)
  .add('AutoComplete', simpleComplete, { info: { source: false, text: textComplete } })
  .add('自定义下拉选项', customComplete, { info: { source: false, text: textCustom } })
  .add('异步请求Gihub用户名', ajaxComplete, { info: { source: false, text: textAjax } })


