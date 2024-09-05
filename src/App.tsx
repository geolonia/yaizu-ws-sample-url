import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";

import Home from './App/Home'
import List from './App/List'
import AboutUs from './App/AboutUs'
import Category from './App/Category'
import Images from './App/Images'

import Tabbar from './App/Tabbar'
import Papa from 'papaparse'
import { sheetUrl2CsvUrl } from "./lib/sheet2CsvUrl";
import config from './config.json'

const sortShopList = async (shopList: Pwamap.ShopData[]) => {

  // 新着順にソート
  return shopList.sort(function (item1, item2) {
    return Date.parse(item2['タイムスタンプ']) - Date.parse(item1['タイムスタンプ'])
  });

}

const App = () => {
  const [shopList, setShopList] = React.useState<Pwamap.ShopData[]>([])

  const location = useLocation();

  React.useEffect(() => {

    const fetchData = async () => {

      const query = location.search
      const sheetUrl = new URLSearchParams(query).get('url')
      const invalidURLMessage = 'スプレッドシートのURL形式間違っているか、スプレッドシートが公開されていない可能性があります。'

      const csvUrl = sheetUrl2CsvUrl(sheetUrl);

      if (!csvUrl) {
        alert('クエリ文字列に、Googleスプレッドシートの URL を指定して下さい（例：/#/?url=<GoogleスプレッドシートのURL> ')
        return
      }

      try {
        const responseCSV = await fetch(`${csvUrl}&timestamp=${new Date().getTime()}`)
        if (!responseCSV.ok) {
          alert(invalidURLMessage);
          return;
        }
        const csvString = await responseCSV.text();
        Papa.parse(csvString, {
          header: true,
          complete: (results) => {
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
      } catch (error) {
        alert(invalidURLMessage);
        return;
      }

      try {
        const responseSheet = await fetch(`${sheetUrl}&timestamp=${new Date().getTime()}`)
        if (!responseSheet.ok) {
          alert(invalidURLMessage);
          return;
        }
        const htmlString = await responseSheet.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const ogTitleMeta = doc.querySelector('meta[property="og:title"]');
        const ogTitle = ogTitleMeta && ogTitleMeta.getAttribute('content');
        config.title = ogTitle || '焼津市PWAマップ'
      } catch (error) {
        alert(invalidURLMessage)
        return;
      }
    }

    fetchData()
  }, [location.search])


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
