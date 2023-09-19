import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from 'tdesign-icons-react';
import PubSub from 'pubsub-js';
import LyricsBackground from '../components/LyricsBackground';
import { DRAWER, PLAY } from '../event-types';
import { useAppSelector } from '../store/hooks';
import { Row, Col, Image, Slider, type SliderValue } from 'tdesign-react';
import { type PlaySongType } from '../store/types/play';
import PreviousSVG from '../assets/svg/previous-playView.svg';
import PlaySVG from '../assets/svg/play-playView.svg';
import NextSVG from '../assets/svg/next-playView.svg';
import PauseSVG from '../assets/svg/pause-playView.svg';
import { type PropsType } from '../types/props';
import '../style/views/Play.scss';
import { type LyricType } from './types/play';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Play: React.FC<Props> = (props): JSX.Element => {
  const { playAudio, pauseAudio, currentTime, adjustPlaybackProgress } = props;
  const play = useAppSelector((state) => state.play);

  const playRef = useRef(null);
  // const activeSpanRef = useRef(null);
  const lyricRef = useRef(null);

  /** state **/
  const [colorList, setColorList] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [playCover, setPlayCover] = useState<string>('');
  const [playSong, setPlaySong] = useState<PlaySongType>();
  const [playLyric, setPlayLyric] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playProgress, setPlayProgress] = useState<number>(0);
  const [lyric, setLyric] = useState<LyricType[]>([]);
  const [currentLyric, setCurrentLyric] = useState<number>(0);

  // Use div scrolling to trigger lyrics scrolling
  // const [scrollHeight, setScrollHeight] = useState<number>(10);

  // Use lyric list to trigger lyrics scrolling
  const [showLyrics, setShowLyrics] = useState<LyricType[]>([]);

  /** effect **/
  useEffect(() => {
    setIsLoad(false);
    const containerElement = lyricRef.current;
    if (containerElement !== null) {
      (containerElement as HTMLDivElement).scrollTop = 10;
    }
    const playEvent = PubSub.subscribe(PLAY, (_, data) => {
      setPlayCover(play.coverImgUrl);
      // setScrollHeight(10);
      setPlaySong(play);
      (async () => {
        const res = await window.ipcChannel.getMainColor(play.coverImgUrl);
        setColorList(res);
        window.logChannel.info(String(res));
        setIsLoad(true);
      })();
    });
    return () => {
      PubSub.unsubscribe(playEvent);
    };
  }, [play]);

  useEffect(() => {
    setIsLoad(false);
    const containerElement = lyricRef.current;
    if (containerElement !== null) {
      (containerElement as HTMLDivElement).scrollTop = 10;
    }
    (async () => {
      const res = await window.ipcChannel.getMainColor(play.coverImgUrl);
      setPlayCover(play.coverImgUrl);
      setPlaySong(play);
      if (play.lyric !== undefined) {
        setPlayLyric(play.lyric);
      }
      // setScrollHeight(10);
      setColorList(res);
      setIsPlaying(true);
      setIsLoad(true);
    })();
  }, [playCover]);

  useEffect(() => {
    if (currentTime !== undefined) {
      // Progress bar
      const progress = (currentTime / play.time) * 100;
      setPlayProgress(progress);

      // Lyric display
      const currentMicroTime = Math.floor(currentTime * 1000);
      const index = lyric.findIndex((item) => {
        return item.time >= currentMicroTime;
      });
      setCurrentLyric(index - 1);
    }
  }, [currentTime]);

  useEffect(() => {
    const lyrArr = playLyric.split('}');
    const lyr = lyrArr[lyrArr.length - 1].split('\n');
    lyr.shift();
    const newLyric: LyricType[] = [];
    lyr.forEach((value) => {
      const time = String(value.split(']')[0].split('[')[1]);
      if (time !== undefined && time !== 'undefined') {
        const minute = time.split(':')[0];
        const second = time.split(':')[1].split('.')[0];
        const micro = time.split('.')[1];
        const number = parseInt(minute) * 60 * 1000 + parseInt(second) * 1000 + parseInt(micro);
        const str = value.split(']')[1];
        if (str !== '') {
          newLyric.push({ time: number, str });
        }
      }
    });
    newLyric.unshift({ time: 0, str: '. . .' });
    setLyric(newLyric);

    // Init the show lyrics
    setShowLyrics(newLyric.slice(0, 6));
  }, [playLyric]);

  // Lyrics offset
  // useEffect(() => {
  //   const containerElement = lyricRef.current;
  //   const activeElement = activeSpanRef.current;
  //
  //   if (containerElement !== null && activeElement !== null) {
  //     const activeElementHeight = (activeElement as HTMLDivElement).offsetHeight;
  //     (containerElement as HTMLDivElement).scrollTop = scrollHeight + activeElementHeight + 37;
  //     setScrollHeight(scrollHeight + activeElementHeight + 37);
  //   }
  // }, [currentLyric]);

  useEffect(() => {
    setShowLyrics(lyric.slice(currentLyric, currentLyric + 6));
  }, [currentLyric]);

  /** methods **/
  const unfoldHandle = () => {
    PubSub.publish(DRAWER, false);
  };

  const previousClick = () => {
    // TODO: previous music
  };

  const playClick = () => {
    setIsPlaying(true);
    playAudio?.();
  };

  const pauseClick = () => {
    setIsPlaying(false);
    pauseAudio?.();
  };

  const nextClick = () => {
    // TODO: next music
  };

  const slideChange = (value: SliderValue) => {
    adjustPlaybackProgress?.(value as number);
  };

  /** render **/
  if (!isLoad) {
    return <div></div>;
  }

  return (
    <div className={'play-main'}>
      <LyricsBackground colors={colorList} />
      <div className={'function-panel'}>
        <span onClick={unfoldHandle}>
          <ChevronDownIcon />
        </span>
      </div>
      <Row className={'play-contain'}>
        <Col span={6} className={'play-cover-contain'} ref={playRef}>
          <Image src={playCover} className={'play-cover'} fit={'cover'} />
          <div className={'play-song-name'}>{playSong?.name}</div>
          <div className={'play-artist-name'}>{playSong?.artists[0].name}</div>
          <div className={'play-progress-bar'}>
            <Slider label={false} value={playProgress} onChange={slideChange} />
          </div>
          <div className={'play-function-panel'}>
            <div className={'previous-panel'} onClick={previousClick}>
              <Image src={PreviousSVG} className={'func-icon'} overlayContent={<></>} />
            </div>
            {!isPlaying ? (
              <div className={'play-panel'} onClick={playClick}>
                <Image src={PlaySVG} className={'func-icon'} overlayContent={<></>} />
              </div>
            ) : (
              <div className={'pause-panel'} onClick={pauseClick}>
                <Image src={PauseSVG} className={'func-icon'} overlayContent={<></>} />
              </div>
            )}
            <div className={'next-panel'} onClick={nextClick}>
              <Image src={NextSVG} className={'func-icon'} overlayContent={<></>} />
            </div>
          </div>
        </Col>
        <Col span={6} className={'play-lyric-main'}>
          <div ref={lyricRef} className={'play-lyrics-contain'}>
            <div>
              {showLyrics.map((value, index) => (
                <div className={'play-lyric-panel'} key={index}>
                  {/* <span */}
                  {/*  className={index === currentLyric ? 'current-play' : 'not-play'} */}
                  {/*  ref={index === currentLyric ? activeSpanRef : null} */}
                  {/* > */}
                  {/*  {value.str} */}
                  {/* </span> */}
                  <span className={index === 0 ? 'current-play' : 'not-play'}>{value.str}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Play;
