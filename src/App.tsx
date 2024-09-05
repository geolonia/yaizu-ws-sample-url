import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import AboutUs from './App/AboutUs'
import Category from './App/Category'
import Images from './App/Images'

import Tabbar from './App/Tabbar'
import config from "./config.json";
import Papa from 'papaparse'
import { extractSheetUrl, sheetUrl2CsvUrl } from "./lib/sheet2CsvUrl";
import { addQueryToHashUrl } from "./lib/addQueryToHashUrl";

// You can see config.json after running `npm start` or `npm run build`
// import config from './config.json'

const sortShopList = async (shopList: Pwamap.ShopData[]) => {

  // 新着順にソート
  return shopList.sort(function (item1, item2) {
    return Date.parse(item2['タイムスタンプ']) - Date.parse(item1['タイムスタンプ'])
  });

}

const App = () => {
  const [shopList, setShopList] = React.useState<Pwamap.ShopData[]>([])

  React.useEffect(() => {

    // クエリ文字列を取得
    const url = window.location.href;
    let sheetUrl:string | null = extractSheetUrl(url)

    if (!sheetUrl) {
      // 入力させるアラート
      sheetUrl = prompt('GoogleスプレッドシートのURLを入力してください。')
      if (!sheetUrl) {
        return
      }

      addQueryToHashUrl('url', sheetUrl)
    }

    fetch(`${sheetUrl}&timestamp=${new Date().getTime()}`)
    .then((response) => {
      return response.ok ? response.text() : Promise.reject(response.status);
    })
    .then((data) => {
      const titleHtml = data.match(/<title>(.*?)<\/title>/)
      const titleRaw = titleHtml?.[1]
      const title = titleRaw ? titleRaw.replace(' - Google スプレッドシート', '') : '焼津市PWAマップ'
      config.title = title
      document.title = title
    })

    const csvUrl = sheetUrl2CsvUrl(sheetUrl)
    const dataUrl = csvUrl ? csvUrl : config.data_url
    fetch(`${dataUrl}&timestamp=${new Date().getTime()}`)
    .then((response) => {
      return response.ok ? response.text() : Promise.reject(response.status);
    })
    .then((data) => {
      Papa.parse(data, {
        header: true,
        complete: (results) => {
          console.log('results', results)
          const features = results.data

          const nextShopList: Pwamap.ShopData[] = []
          for (let i = 0; i < features.length; i++) {
            const feature = features[i] as Pwamap.ShopData
            if (!feature['緯度'] || !feature['経度'] || !feature['スポット名']) {
              continue;
            }
            if (!feature['緯度'].match(/^[0-9]+(\.[0-9]+)?$/)) {
              continue
            }
            if (!feature['経度'].match(/^[0-9]+(\.[0-9]+)?$/)) {
              continue
            }
            const shop = {
              // @ts-ignore
              index: i,
              ...feature
            }

            nextShopList.push(shop)
          }
          sortShopList(nextShopList).then((sortedShopList) => {
            setShopList(sortedShopList)
          })
        }
      });
    });
  }, [])


  return (
    <div className="app">
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Home data={shopList} />} />
          <Route path="/list" element={<List data={shopList} />} />
          <Route path="/category" element={<Category data={shopList} />} />
          <Route path="/images" element={<Images data={shopList} />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
      <div className="app-footer">
        <Tabbar />
      </div>
    </div>
  );
}

export default App;
