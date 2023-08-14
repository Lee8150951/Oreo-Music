import { contextBridge } from 'electron';
import * as process from 'process';
import log from 'electron-log';
import { getColorRenderer } from './play/colorChannel';

// Environment
contextBridge.exposeInMainWorld('environmentChannel', {
  node: () => process.versions.node,
  platform: () => process.platform,
  electron: () => process.versions.chrome,
});

// Logger
contextBridge.exposeInMainWorld('logChannel', {
  debug: (str: string) => {
    log.debug(str);
  },
  info: (str: string) => {
    log.info(str);
  },
  warn: (str: string) => {
    log.warn(str);
  },
  error: (str: string) => {
    log.error(str);
  },
});

// Functions
contextBridge.exposeInMainWorld('ipcChannel', {
  getMainColor: getColorRenderer,
});
