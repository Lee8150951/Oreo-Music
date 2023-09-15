import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from 'tdesign-icons-react';
import PubSub from 'pubsub-js';
import LyricsBackground from '../components/LyricsBackground';
import { DRAWER, PLAY } from '../event-types';
import { useAppSelector } from '../store/hooks';
import { Row, Col, Image, Slider } from 'tdesign-react';
import { type PlaySongType } from '../store/types/play';
import PreviousSVG from '../assets/svg/previous-playView.svg';
import PlaySVG from '../assets/svg/play-playView.svg';
import NextSVG from '../assets/svg/next-playView.svg';
import PauseSVG from '../assets/svg/pause-playView.svg';
import { type PropsType } from '../types/props';
import '../style/views/Play.scss';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Play: React.FC<Props> = (props): JSX.Element => {
  const { playAudio, pauseAudio, currentTime } = props;
  const play = useAppSelector((state) => state.play);

  const playRef = useRef(null);

  /** state **/
  const [colorList, setColorList] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [playCover, setPlayCover] = useState<string>('');
  const [playSong, setPlaySong] = useState<PlaySongType>();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playProgress, setPlayProgress] = useState<number>(0);

  /** effect **/
  useEffect(() => {
    setIsLoad(false);
    const playEvent = PubSub.subscribe(PLAY, (_, data) => {
      setPlayCover(play.coverImgUrl);
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
    (async () => {
      const res = await window.ipcChannel.getMainColor(play.coverImgUrl);
      setPlayCover(play.coverImgUrl);
      setPlaySong(play);
      setColorList(res);
      setIsPlaying(true);
      setIsLoad(true);
    })();
  }, [playCover]);

  useEffect(() => {
    if (currentTime !== undefined) {
      const progress = (currentTime / play.time) * 100;
      setPlayProgress(progress);
    }
  }, [currentTime]);

  /** methods **/
  const unfoldHandle = () => {
    PubSub.publish(DRAWER, false);
  };

  const previousClick = () => {};

  const playClick = () => {
    setIsPlaying(true);
    playAudio?.();
  };

  const pauseClick = () => {
    setIsPlaying(false);
    pauseAudio?.();
  };

  const nextClick = () => {};

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
            <Slider label={false} value={playProgress}></Slider>
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
        <Col span={6} className={'play-lyrics-contain'}></Col>
      </Row>
    </div>
  );
};

export default Play;
