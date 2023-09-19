import React, { useEffect, useRef, useState } from 'react';
import DragBar from '../src/components/DragBar';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';
import 'tdesign-react/dist/reset.css';
import '../src/style/theme.css';
import './style/global.scss';

function App() {
  // Music element ref
  const audioRef = useRef(null);

  /** state **/
  // Music Control
  const [currentTime, setCurrentTime] = useState(0); // Current timestamp
  const [volume, setVolume] = useState(1); // Volume
  const [src, setSrc] = useState('');

  /** effect **/
  useEffect(() => {
    const node = window.environmentChannel.node();
    const platform = window.environmentChannel.platform();
    const electron = window.environmentChannel.electron();
    window.logChannel.info(`NODE: v${String(node)}`);
    window.logChannel.info(`PLATFORM: ${String(platform)}`);
    window.logChannel.info(`Chromium: v${String(electron)}`);
  }, []);

  // Reload audio elements
  useEffect(() => {
    if (audioRef.current !== null) {
      (audioRef.current as HTMLAudioElement).oncanplaythrough = () => {
        if (audioRef.current !== null) {
          (audioRef.current as HTMLAudioElement).play();
        }
      };
      (audioRef.current as HTMLAudioElement).load();
    }
    return () => {
      if (audioRef.current !== null) {
        (audioRef.current as HTMLAudioElement).oncanplaythrough = null;
      }
    };
  }, [src]);

  /** methods **/
  // Play music
  const playAudio = () => {
    if (audioRef.current !== null) {
      (audioRef.current as HTMLAudioElement).play();
    }
  };

  // Pause music
  const pauseAudio = () => {
    if (audioRef.current !== null) {
      (audioRef.current as HTMLAudioElement).pause();
    }
  };

  // Get music timestamp
  const handleTimeUpdate = () => {
    if (audioRef.current !== null) {
      setCurrentTime((audioRef.current as HTMLAudioElement).currentTime);
    }
  };

  // Control volume
  const handleVolumeChange = (volume: number) => {
    if (audioRef.current !== null) {
      (audioRef.current as HTMLAudioElement).volume = volume;
      setVolume(volume);
    }
  };

  // Set music source
  const setMusicSource = (url: string) => {
    setSrc(url);
  };

  // Adjust the playback progress
  const adjustPlaybackProgress = (percentage: number) => {
    if (audioRef.current !== null) {
      const duration = (audioRef.current as HTMLAudioElement).duration;
      (audioRef.current as HTMLAudioElement).currentTime = duration * (percentage / 100);
    }
  };

  /** render **/
  return (
    <>
      <DragBar />
      <HashRouter>
        <RouterView
          currentTime={currentTime}
          volume={volume}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          handleVolumeChange={handleVolumeChange}
          setMusicSource={setMusicSource}
          adjustPlaybackProgress={adjustPlaybackProgress}
        />
      </HashRouter>
      <div style={{ visibility: 'hidden', position: 'absolute' }}>
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} preload={'metadata'}>
          <source src={src} />
        </audio>
      </div>
    </>
  );
}

export default App;
