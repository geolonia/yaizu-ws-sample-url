export const addQueryToHashUrl = (key: string, value: string) => {
  // 現在のURLを取得
  let url = new URL(window.location.href);

  // クエリ文字列の操作
  let params = new URLSearchParams(url.search);
  params.set(key, value); // クエリパラメータを追加・更新

  // ハッシュを保持
  let hash = url.hash;

  // クエリ文字列をURLに反映
  let newUrl = `${url.origin}${url.pathname}?${params.toString()}${hash}`;

  // 新しいURLに変更
  window.history.pushState(null, '', newUrl);
}
