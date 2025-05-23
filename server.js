const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// 定義MIME類型映射
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

// 創建HTTP伺服器
const server = http.createServer((req, res) => {
  console.log(`收到請求: ${req.url}`);
  
  // 處理URL
  let url = req.url;
  
  // 處理根路徑請求
  if (url === '/') {
    url = '/index.html';
  }
  
  // 處理錯誤測試路由
  if (url.startsWith('/test-error/')) {
    const errorCode = url.split('/')[2];
    const validCodes = ['400', '401', '403', '404', '500', '502', '503'];
    
    if (validCodes.includes(errorCode)) {
      url = `/${errorCode}.html`;
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end(`不支援的錯誤代碼: ${errorCode}。支援的代碼: ${validCodes.join(', ')}`);
      return;
    }
  }
  
  // 處理錯誤頁面路由
  if (url.startsWith('/error/')) {
    const errorCode = url.split('/')[2].split('?')[0];
    const validCodes = ['400', '401', '403', '404', '500', '502', '503'];
    
    if (validCodes.includes(errorCode)) {
      url = `/${errorCode}.html`;
    } else {
      url = '/404.html';
    }
  }
  
  // 構建文件路徑
  const filePath = path.join(PUBLIC_DIR, url);
  
  // 獲取文件擴展名
  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // 讀取文件
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // 文件不存在，返回404頁面
        fs.readFile(path.join(PUBLIC_DIR, '404.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('伺服器錯誤');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // 其他錯誤，返回500頁面
        fs.readFile(path.join(PUBLIC_DIR, '500.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('伺服器錯誤');
          } else {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      }
    } else {
      // 成功讀取文件
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// 啟動伺服器
server.listen(PORT, () => {
  console.log(`伺服器運行於 http://localhost:${PORT}`);
  console.log(`您可以訪問以下錯誤頁面：`);
  console.log(`- 400 錯誤: http://localhost:${PORT}/test-error/400`);
  console.log(`- 401 錯誤: http://localhost:${PORT}/test-error/401`);
  console.log(`- 403 錯誤: http://localhost:${PORT}/test-error/403`);
  console.log(`- 404 錯誤: http://localhost:${PORT}/test-error/404`);
  console.log(`- 500 錯誤: http://localhost:${PORT}/test-error/500`);
  console.log(`- 502 錯誤: http://localhost:${PORT}/test-error/502`);
  console.log(`- 503 錯誤: http://localhost:${PORT}/test-error/503`);
});
