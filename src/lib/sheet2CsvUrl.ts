
export const sheetUrl2CsvUrl = (sheetUrl: string | null): string | null => {

  if (!sheetUrl) {
    return null;
  }

  const fileId = sheetUrl.match(/\/d\/([^/]+)/)?.[1]
  const gid = sheetUrl?.split('gid=')[1]
  return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=csv&gid=${gid}`
}
