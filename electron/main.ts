import { app, BrowserWindow } from 'electron';

const createWindow = async () => {
  const win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 670,
    width: 1000,
    height: 670,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  await win.loadURL('http://localhost:3000/');
};

app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      (async () => {
        await createWindow();
      })();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
