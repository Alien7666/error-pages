const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const PUBLIC_DIR = path.join(__dirname, 'public');

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

const server = http.createServer((req, res) => {
  console.log(`收到請求: ${req.url}`);
  
  // 處理根路徑請求
  let filePath = req.url === '/' 
    ? path.join(PUBLIC_DIR, 'index.html') 
    : path.join(PUBLIC_DIR, req.url);
  
  // 取得文件擴展名
  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
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

server.listen(PORT, () => {
  console.log(`伺服器運行於 http://localhost:${PORT}`);
  console.log(`您可以訪問以下錯誤頁面：`);
  console.log(`- 400 錯誤: http://localhost:${PORT}/400.html`);
  console.log(`- 401 錯誤: http://localhost:${PORT}/401.html`);
  console.log(`- 403 錯誤: http://localhost:${PORT}/403.html`);
  console.log(`- 404 錯誤: http://localhost:${PORT}/404.html`);
  console.log(`- 500 錯誤: http://localhost:${PORT}/500.html`);
  console.log(`- 502 錯誤: http://localhost:${PORT}/502.html`);
  console.log(`- 503 錯誤: http://localhost:${PORT}/503.html`);
});
