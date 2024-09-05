export const extractSheetUrl = (url: string): string => {
  const match = url.match(/url=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

export const sheetUrl2CsvUrl = (sheetUrl: string): string => {

  if (!sheetUrl) {
    return ''
  }

  const fileId = sheetUrl.match(/\/d\/([^/]+)/)?.[1]
  const gid = sheetUrl?.split('gid=')[1]
  return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=csv&gid=${gid}`
}
