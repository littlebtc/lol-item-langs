import React, { FunctionComponent } from 'react'
import useSWR from 'swr'
import './App.css'

interface ItemResult {
  data: {
    [key: string]: {
      name: string
    }
  }
}

const App: FunctionComponent = () => {
  const { data: versions } = useSWR<string[]>('https://ddragon.leagueoflegends.com/api/versions.json')
  const { data: items } = useSWR<ItemResult>(() => (versions == null) ? null : `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/en_US/item.json`)
  const { data: itemsTw } = useSWR<ItemResult>(() => (versions == null) ? null : `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/zh_TW/item.json`)
  const { data: itemsCn } = useSWR<ItemResult>(() => (versions == null) ? null : `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/zh_CN/item.json`)
  const { data: itemsKo } = useSWR<ItemResult>(() => (versions == null) ? null : `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/ko_KR/item.json`)
  if (versions == null || items == null || itemsTw == null || itemsCn == null || itemsKo == null) {
    return <>Fetching Data Dragon...</>
  }
  const version = versions[0]

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>圖標</th>
            <th>英文</th>
            <th>台服</th>
            <th>國服</th>
            <th>韓服</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items.data).map(([id, detail]) =>
            <tr>
              <td><img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`} alt={detail.name}/></td>
              <td>{detail.name}</td>
              <td>{itemsTw.data[id].name}</td>
              <td>{itemsCn.data[id].name}</td>
              <td>{itemsKo.data[id].name}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App
