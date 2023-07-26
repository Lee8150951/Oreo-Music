import { app, BrowserWindow } from 'electron';

const createWindow = async () => {
  const win = new BrowserWindow({
    minWidth: 1100,
    minHeight: 770,
    width: 1100,
    height: 770,
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
