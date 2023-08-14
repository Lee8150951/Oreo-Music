import { app, BrowserWindow } from 'electron';
import log from 'electron-log';
import * as path from 'path';
import { processColorMain } from '../src/channel/play/colorChannel';

const createWindow = async () => {
  const win = new BrowserWindow({
    minWidth: 1100,
    minHeight: 770,
    width: 1100,
    height: 770,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../src/channel/index.js'),
    },
  });

  await win.loadURL('http://localhost:3000/');
};

app.whenReady().then(async () => {
  // Log configure
  log.transports.console.format = '[{y}-{m}-{d} {h}:{i}:{s}] [{level}]{scope} {text}';
  log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}] [{level}]{scope} {text}';

  // Register the ipc channel
  await processColorMain();

  try {
    await createWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        (async () => {
          await createWindow();
        })();
      }
    });
    log.info('The application started successfully');
  } catch (error) {
    log.error(`An error occurred when the application started: ${String(error)}`);
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
