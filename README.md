# Geolonia PWAマップ

以下のようにクエリパラメータにGoogle スプレッドシートのURLを指定することでデータを読み込んで表示できます。

```
https://geolonia.github.io/yaizu-ws-sample-url/#/?url=<Google スプレッドシートのURL>
```

例  
https://geolonia.github.io/yaizu-ws-sample-url/#/?url=https://docs.google.com/spreadsheets/d/1MLQnXpk2Fhp6DN2l4gZUCKCzw_gP_wmfi9c2JKgH8UA/edit?gid=1957425126#gid=1957425126

### Google スプレッドシートの 設定

スプレッドシートの共有設定を「リンクを知っている全員」に変更して下さい。

![スクリーンショット 2024-09-05 18 34 05](https://github.com/user-attachments/assets/5604aa22-6830-4a20-b8a5-a4078ec4620a)


URLを取得して、`?url=<Google スプレッドシートのURL>`でURLに追加して下さい。
※ 注意: URLは共有URLではなくブラウザのURLを使用して下さい
![スクリーンショット 2024-09-05 18 38 34](https://github.com/user-attachments/assets/8a9b1b77-513d-436d-9b2c-ce1de3b521fe)


## 開発

[Geolonia PWA マップ ユーザーマニュアル](https://blog.geolonia.com/2022/05/17/pwamap-manual-setup.html) の手順を実行、その後以下のコマンドを実行して下さい。

```shell
$ git clone git@github.com:geoloniamaps/pwa.git
$ cd pwa
$ npm install
$ npm start
```

下の URL にアクセスして下さい。開発サーバーが立ち上がります。

`http://localhost:3000/#/`


## 注意事項
このプログラムは自由にカスタマイズ可能ですが、利用についてはサポート対象外となります。

