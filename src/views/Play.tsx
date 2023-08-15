import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from 'tdesign-icons-react';
import PubSub from 'pubsub-js';
import LyricsBackground from '../components/LyricsBackground';
import { DRAWER, PLAY } from '../event-types';
import { useAppSelector } from '../store/hooks';
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

  /** effect **/
  useEffect(() => {
    setIsLoad(false);
    const playEvent = PubSub.subscribe(PLAY, (_, data) => {
      setPlayCover(play.coverImgUrl);
      (async () => {
        const res = await window.ipcChannel.getMainColor(play.coverImgUrl);
        console.log(res);
        setColorList(res);
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
      <div>1</div>
      <div className={'function-panel'}>
        <span onClick={unfoldHandle}>
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  );
};

export default Play;
