import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from 'tdesign-icons-react';
import PubSub from 'pubsub-js';
import LyricsBackground from '../components/LyricsBackground';
import { DRAWER, PLAY } from '../event-types';
import { useAppSelector } from '../store/hooks';
import { Row, Col, Image } from 'tdesign-react';
import { type PlaySongType } from '../store/types/play';
import PreviousSVG from '../assets/svg/previous-playView.svg';
import PlaySVG from '../assets/svg/play-playView.svg';
import NextSVG from '../assets/svg/next-playView.svg';
import '../style/views/Play.scss';

interface Props {
  children?: React.ReactNode;
}

const Play: React.FC<Props> = (props): JSX.Element => {
  const play = useAppSelector((state) => state.play);

  /** state **/
  const [colorList, setColorList] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [playCover, setPlayCover] = useState<string>('');
  const [playSong, setPlaySong] = useState<PlaySongType>();

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
      setColorList(res);
      setIsLoad(true);
    })();
  }, [playCover]);

  /** methods **/
  const unfoldHandle = () => {
    PubSub.publish(DRAWER, false);
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
        <Col span={6} className={'play-cover-contain'}>
          <Image src={playCover} className={'play-cover'} fit={'cover'} />
          <div className={'play-song-name'}>{playSong?.name}</div>
          <div className={'play-artist-name'}>{playSong?.artists[0].name}</div>
          <div className={'play-progress-bar'}></div>
          <div className={'play-function-panel'}>
            <div className={'previous-panel'}>
              <Image src={PreviousSVG} className={'func-icon'} overlayContent={<></>} />
            </div>
            <div className={'play-panel'}>
              <Image src={PlaySVG} className={'func-icon'} overlayContent={<></>} />
            </div>
            <div className={'next-panel'}>
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
