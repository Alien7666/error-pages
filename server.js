const express = require('express');
const path = require('path');
const url = require('url');

const app = express();
const PORT = process.env.PORT || 3000;

// 提供 public 資料夾中的靜態檔案 (CSS, JS, 圖片等)
app.use(express.static(path.join(__dirname, 'public')));

// 首頁路由 - 提供一個簡單的示範頁面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 測試路由 - 用於測試不同的錯誤代碼
app.get('/test-error/:code', (req, res) => {
  const errorCode = req.params.code;
  const validCodes = ['400', '401', '403', '404', '500', '502', '503'];
  
  if (validCodes.includes(errorCode)) {
    // 將請求源資訊傳遞給錯誤頁面
    const referer = req.get('Referer') || '/';
    const parsedReferer = url.parse(referer);
    const origin = req.get('Host');
    
    // 設置查詢參數以傳遞源資訊
    res.status(parseInt(errorCode)).redirect(`/error/${errorCode}?origin=${encodeURIComponent(origin)}&referer=${encodeURIComponent(referer)}`);
  } else {
    res.status(400).send(`不支援的錯誤代碼: ${errorCode}。支援的代碼: ${validCodes.join(', ')}`);
  }
});

// 錯誤頁面路由
app.get('/error/:code', (req, res) => {
  const errorCode = req.params.code;
  const validCodes = ['400', '401', '403', '404', '500', '502', '503'];
  
  if (validCodes.includes(errorCode)) {
    res.status(parseInt(errorCode)).sendFile(path.join(__dirname, 'public', `${errorCode}.html`));
  } else {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
});

// 處理所有未匹配的路由，回傳 404 頁面
app.use((req, res) => {
  // 將請求源資訊傳遞給錯誤頁面
  const referer = req.get('Referer') || '/';
  const parsedReferer = url.parse(referer);
  const origin = req.get('Host');
  
  // 設置查詢參數以傳遞源資訊
  res.status(404).redirect(`/error/404?origin=${encodeURIComponent(origin)}&referer=${encodeURIComponent(referer)}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`測試不同錯誤頁面: http://localhost:${PORT}/test-error/[錯誤代碼]`);
  console.log(`支援的錯誤代碼: 400, 401, 403, 404, 500, 502, 503`);
});
