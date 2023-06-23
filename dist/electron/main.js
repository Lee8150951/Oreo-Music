"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 导入 Node.js 模块
const electron_1 = require("electron");
// 创建 BrowserWindow 对象
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
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
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// 在所有窗口关闭时退出应用
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
//# sourceMappingURL=main.js.map