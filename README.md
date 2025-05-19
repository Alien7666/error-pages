# HTTP 錯誤頁面集合 (Node.js 版)

作者: Alien
日期: 2025-05-19
電郵: alien@azndev.com

版權聲明: 本專案及其內容遵循 [MIT 授權條款](https://opensource.org/licenses/MIT)。您可以自由使用、修改和分發本專案的代碼和資源，但請保留原作者信息和版權聲明。

## 專案概述

本專案提供了一組美觀的 HTTP 錯誤頁面，通過一個輕量化的 Node.js 伺服器來提供服務。這些錯誤頁面包括：

- **400** - 錯誤請求
- **401** - 未授權
- **403** - 禁止訪問 (已修復警車燈效果)
- **404** - 找不到頁面
- **500** - 內部伺服器錯誤
- **502** - 錯誤網關
- **503** - 服務不可用

這些頁面是獨立的靜態 HTML 文件，每個文件都包含內嵌的 CSS 和 JavaScript，無需外部依賴。伺服器使用 Node.js 內建模組，不需要安裝任何額外的 npm 套件。

## 功能特色

1. **獨立 HTML 文件**：每個錯誤頁面都是一個包含內嵌 CSS 和 JavaScript 的獨立 HTML 文件。
2. **動態返回按鈕**：頁面包含一個動態的返回按鈕，會檢查 `document.referrer` 來決定導航到前一頁還是首頁。
3. **響應式設計**：所有頁面都具備響應式設計，適應各種屏幕尺寸。
4. **視覺效果**：每個錯誤頁面都有獨特的主題和增強用戶體驗的視覺效果，如動畫和背景風格。
5. **輕量化 Node.js 伺服器**：提供了一個不依賴外部模組的極簡 Node.js 伺服器，用於本地預覽和測試。

## 使用方法

### 安裝與啟動

您不需要安裝任何依賴，只需有 Node.js 環境即可運行伺服器：

```bash
npm start
```

或直接運行：

```bash
node server.js
```

伺服器將在 `http://localhost:3000` 上啟動，您可以通過以下路徑訪問錯誤頁面：

- 400 錯誤: http://localhost:3000/test-error/400
- 401 錯誤: http://localhost:3000/test-error/401
- 403 錯誤: http://localhost:3000/test-error/403
- 404 錯誤: http://localhost:3000/test-error/404
- 500 錯誤: http://localhost:3000/test-error/500
- 502 錯誤: http://localhost:3000/test-error/502
- 503 錯誤: http://localhost:3000/test-error/503

### 直接使用靜態文件

您也可以直接使用 `public/` 目錄中的 HTML 文件，將其部署到任何靜態網站託管服務上，如 GitHub Pages、Netlify 等。

## 部署到 GitHub Pages

本專案可以輕鬆部署到 GitHub Pages 上。創建一個新的 GitHub 存儲庫，然後推送您的代碼。設置 GitHub Pages 來源為 `main` 分支的 `public` 目錄，或者使用 `gh-pages` 分支。

## 授權

本專案遵循 MIT 授權條款。您可以自由使用、修改和分發本專案的代碼和資源，但請保留原作者信息和版權聲明。

## 聯繫方式

如有任何問題或建議，請通過 alien@azndev.com 與我聯繫。
