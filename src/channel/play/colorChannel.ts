import { ipcMain, ipcRenderer } from 'electron';
import { COLOR_CHANNEL } from '../channel-types';
import Vibrant from 'node-vibrant';

export const getColorRenderer = async (url: string) => {
  return await ipcRenderer.invoke(COLOR_CHANNEL, url);
};

export const processColorMain = async () => {
  ipcMain.handle(COLOR_CHANNEL, async (event, args) => {
    const vibrant = new Vibrant(args);
    const colors: string[] = [];
    try {
      const palette = await vibrant.getPalette();
      if (palette.Vibrant != null) {
        const rgb = palette.Vibrant.getRgb();
        const rgbString = rgb.map((value) => Math.round(value).toString());
        colors.push(`rgb(${rgbString.join(', ')})`);
      }
      if (palette.Muted != null) {
        const rgb = palette.Muted.getRgb();
        const rgbString = rgb.map((value) => Math.round(value).toString());
        colors.push(`rgb(${rgbString.join(', ')})`);
      }
      if (palette.DarkVibrant != null) {
        const rgb = palette.DarkVibrant.getRgb();
        const rgbString = rgb.map((value) => Math.round(value).toString());
        colors.push(`rgb(${rgbString.join(', ')})`);
      }
      if (palette.DarkMuted != null) {
        const rgb = palette.DarkMuted.getRgb();
        const rgbString = rgb.map((value) => Math.round(value).toString());
        colors.push(`rgb(${rgbString.join(', ')})`);
      }
    } catch (error) {
      console.error(error);
    }
    return colors;
  });
};
