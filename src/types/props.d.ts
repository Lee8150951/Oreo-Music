import type React from 'react';
import { type NavigateFunction, type Location } from 'react-router-dom';

export interface PropsType {
  children?: React.ReactNode;
  navigate?: NavigateFunction;
  location?: Location;
  param?: any;
  usp?: any;
  currentTime?: number;
  volume?: number;
  playAudio?: () => void;
  pauseAudio?: () => void;
  handleVolumeChange?: (volume: number) => void;
  setMusicSource?: (url: string) => void;
  adjustPlaybackProgress?: (percentage: number) => void;
}
