# 工程 AI 出圖系統

生成式 AI 土建工程應用班專用版 — 依工程類別、圖面類型與比例，一鍵生成高品質 AI 繪圖提示語的 PWA 工具。

## 檔案結構（全部位於根目錄）

| 檔案 | 用途 |
|---|---|
| `index.html` | 主程式（HTML／CSS／JS 內嵌） |
| `manifest.json` | PWA 安裝設定 |
| `sw.js` | Service Worker（離線快取） |
| `icon-192.png`、`icon-512.png` | PWA 安裝圖示（透明底） |
| `icon-maskable-192.png`、`icon-maskable-512.png` | Android 自適應圖示（白底，含安全邊距） |
| `apple-touch-icon.png` | iOS 主畫面圖示（180×180，白底） |
| `favicon.png` | 瀏覽器分頁圖示（32×32） |

## 部署至 GitHub Pages

1. 新建 Repository，將本壓縮檔解壓後的所有檔案上傳至**根目錄**。
2. Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main`／`/(root)`，儲存。
3. 數分鐘後於 `https://<帳號>.github.io/<Repository>/` 開啟。

## 安裝至手機

- **Android（Chrome）**：開啟網址 → 點右下角「📲 安裝至主畫面」，或右上角選單 →「安裝應用程式」。
- **若出現「無法開啟應用程式」**：先至手機「設定 → 應用程式」解除安裝舊的同名 App，並於 Chrome「設定 → 網站設定 → 所有網站」清除 `cschangtw.github.io` 資料後，重新開啟網址安裝。
- **iOS（Safari）**：開啟網址 → 分享 →「加入主畫面」。

## 更新版本

修改 `index.html` 後，請將 `sw.js` 第 3 行 `CACHE` 版本號加一（目前為 `v2`，下次改為 `v3`），已安裝的使用者才會取得新版。
