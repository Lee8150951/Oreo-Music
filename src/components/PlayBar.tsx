import React, { useEffect, useState } from 'react';
import { Row, Col, Slider, Image } from 'tdesign-react';
import voice from '../assets/icon/voice.png';
import like from '../assets/icon/like.png';
import SpreadSVG from '../assets/svg/spread.svg';
import PreviousSVG from '../assets/svg/previous.svg';
import NextSVG from '../assets/svg/next.svg';
import CircleSVG from '../assets/svg/circle.svg';
import RandomSVG from '../assets/svg/random.svg';
import PlaySVG from '../assets/svg/play.svg';
import PauseSVG from '../assets/svg/pause.svg';
import PubSub from 'pubsub-js';
import { DRAWER } from '../event-types';
import { useAppSelector } from '../store/hooks';
import { type PlaySongType } from '../store/types/play';
import '../style/components/PlayBar.scss';
import { type PropsType } from '../types/props';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const PlayBar: React.FC<Props> = (props): JSX.Element => {
  const { playAudio, pauseAudio, currentTime } = props;
  const _playSong = useAppSelector((state) => state.play);

  /** state **/
  const [playSong, setPlaySong] = useState<PlaySongType>();
  const [playProgress, setPlayProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  /** effect **/
  useEffect(() => {
    setPlaySong(_playSong);
  }, [_playSong]);

  useEffect(() => {
    if (currentTime !== undefined) {
      const progress = (currentTime / _playSong.time) * 100;
      setPlayProgress(progress);
    }
  }, [currentTime]);

  /** methods **/
  const spreadDrawer = () => {
    PubSub.publish(DRAWER, true);
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

  /** render **/
  return (
    <div className={'play-bar-main'}>
      <div className={'progress-bar-panel'}>
        <Slider label={false} value={playProgress}></Slider>
      </div>
      <Row className={'play-bar-contain'}>
        <Col className={'play-info'} span={5}>
          <div className={'album-cover-panel'} onClick={spreadDrawer}>
            <img className={'album-cover'} src={playSong?.coverImgUrl} alt="album" />
            <div className={'album-cover-mask'}>
              <Image className={'spread-icon'} src={SpreadSVG} overlayContent={<></>} />
            </div>
          </div>
          <div className={'album-title'}>{playSong?.name}</div>
          <div className={'album-author'}>
            <span>{playSong?.artists[0].name}</span>
          </div>
        </Col>
        <Col className={'control-btn'} span={2}>
          <div className={'random-icon-panel'}>
            <Image src={RandomSVG} className={'other-icon'} overlayContent={<></>} />
          </div>
          <div className={'previous-icon-panel'} onClick={previousClick}>
            <Image src={PreviousSVG} className={'func-icon'} overlayContent={<></>} />
          </div>
          {!isPlaying ? (
            <div className={'play-icon-panel'} onClick={playClick}>
              <Image src={PlaySVG} className={'play-icon'} overlayContent={<></>} />
            </div>
          ) : (
            <div className={'pause-icon-panel'} onClick={pauseClick}>
              <Image src={PauseSVG} className={'pause-icon'} overlayContent={<></>} />
            </div>
          )}
          <div className={'next-icon-panel'} onClick={nextClick}>
            <Image src={NextSVG} className={'func-icon'} overlayContent={<></>} />
          </div>
          <div className={'single-icon-panel'}>
            <Image src={CircleSVG} className={'other-icon'} overlayContent={<></>} />
          </div>
        </Col>
        <Col className={'other-btn'} span={5}>
          <div className={'like-icon-panel'}>
            <img className={'like-icon'} src={like} alt="next" />
          </div>
          <div className={'voice-icon-panel'}>
            <img className={'voice-icon'} src={voice} alt="next" />
          </div>
          <div className={'voice-slider'}>
            <Slider label={false}></Slider>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PlayBar;
