import React, { useEffect, useRef, useState } from 'react';
import DragBar from '../src/components/DragBar';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';
import 'tdesign-react/dist/reset.css';
import '../src/style/theme.css';
import './style/global.scss';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { changePlaylist } from './store/slices/playlistSlice';
import utils from './util/utils';
import playApi from './http/apis/playApi';
import type ResponseType from './types/res';
import PubSub from 'pubsub-js';
import { PLAY } from './event-types';
import { type PlaySongType } from './store/types/play';
import { changePlay } from './store/slices/playSlice';

function App() {
  const playlist = useAppSelector((state) => state.playlist);
  const dispatch = useAppDispatch();

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

  // Play according to the playlist
  useEffect(() => {
    (async () => {
      const music = playlist[0];
      const res = (await playApi.getSongUrl(String(music.sid), 'exhigh')) as ResponseType;
      const songDetail = (await playApi.getSongDetail(String(music.sid))) as ResponseType;
      const songLyric = (await playApi.getSongLyric(String(music.sid))) as ResponseType;
      const { url, type, size } = res.data[0];
      const { dt } = songDetail.songs[0];
      const { lyric } = songLyric.lrc;
      // Public event
      PubSub.publish(PLAY, music.sid);
      // Save music info
      const currentSong: PlaySongType = {
        id: parseInt(music.sid),
        name: music.name,
        url,
        type,
        lyric,
        // unit: second
        time: Math.floor(dt / 1000),
        size,
        coverImgUrl: songDetail.songs[0].al.picUrl,
        artists: songDetail.songs[0].ar,
        album: songDetail.songs[0].al,
      };
      dispatch(changePlay(currentSong));
      setMusicSource(url);
    })();
  }, [playlist]);

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

  // When the music is finished
  const handleOnEnded = () => {
    const bacPlaylist = utils.deepClone(playlist);
    bacPlaylist.shift();
    dispatch(changePlaylist(bacPlaylist));
  };

  // Triggered when there is a playback error
  const handleOnError = () => {
    console.log('Play Error');
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
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleOnEnded}
          onError={handleOnError}
          preload={'metadata'}
        >
          <source src={src} />
        </audio>
      </div>
    </>
  );
}

export default App;
