declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

declare interface Window {
  environmentChannel: {
    node: () => string;
    platform: () => string;
    electron: () => string;
  };
  logChannel: {
    debug: (x: string) => void;
    info: (x: string) => void;
    warn: (x: string) => void;
    error: (x: string) => void;
  };
  ipcChannel: {
    getMainColor: (url: string) => Promise<string>;
  };
}
