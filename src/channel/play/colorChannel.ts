import { ipcRenderer, ipcMain } from 'electron';
import { COLOR_CHANNEL } from '../channel-types';

export const getColorRenderer = async (url: string) => {
  return await ipcRenderer.invoke(COLOR_CHANNEL, url);
};

export const processColorMain = async () => {
  ipcMain.handle(COLOR_CHANNEL, async (event, args) => {
    return args;
  });
};
