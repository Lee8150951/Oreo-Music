// 导入 Node.js 模块
import { app, BrowserWindow } from 'electron';

// 创建 BrowserWindow 对象
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 加载应用的 index.html 文件
  win.loadURL('http://localhost:3000/');
};

// 当 Electron 初始化完成时调用 createWindow 函数
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 在所有窗口关闭时退出应用
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
