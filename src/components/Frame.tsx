import React, { useEffect, useState } from 'react';
import { Layout } from 'tdesign-react';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import PlayBar from './PlayBar';
import PubSub from 'pubsub-js';
import Play from '../views/Play';
import { DRAWER } from '../event-types';
import { useAppSelector } from '../store/hooks';
import { type PlaySongType } from '../store/types/play';
import '../style/components/Frame.scss';
import { type PropsType } from '../types/props';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Frame: React.FC<Props> = (props): JSX.Element => {
  const { children, currentTime, playAudio, pauseAudio, handleVolumeChange, volume, adjustPlaybackProgress } = props;
  const { Content, Aside } = Layout;
  const play = useAppSelector((state) => state.play);

  /** state **/
  const [isSpread, setIsSpread] = useState<boolean>(false);
  const [marginTop, setMarginTop] = useState<number>(window.innerHeight * 1.5);
  const [playSong, setPlaySong] = useState<PlaySongType>();

  /** effect **/
  // Subscribe to the global drawer event
  useEffect(() => {
    const drawer = PubSub.subscribe(DRAWER, (_, data: boolean) => {
      setIsSpread(data);
      if (data) {
        setMarginTop(0);
      } else {
        setMarginTop(window.innerHeight * 1.5);
      }
    });
    return () => {
      PubSub.unsubscribe(drawer);
    };
  }, []);

  // Process window resize action
  useEffect(() => {
    const handleResize = () => {
      if (!isSpread) {
        setMarginTop(window.innerHeight * 1.5);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setPlaySong(play);
  }, [play]);

  /** methods **/

  /** render **/
  return (
    <div className={'frame'}>
      <Layout>
        <Aside className={'aside'}>
          <SideNavbar></SideNavbar>
        </Aside>
        <Layout className={'layout'}>
          <Content>
            <div className={'header'}>
              <TopNavbar />
            </div>
            <div className={'content'}>{children}</div>
          </Content>
        </Layout>
      </Layout>
      {playSong?.id === -1 ? (
        <></>
      ) : (
        <div className={'footer'}>
          <PlayBar
            currentTime={currentTime}
            volume={volume}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            handleVolumeChange={handleVolumeChange}
            adjustPlaybackProgress={adjustPlaybackProgress}
          />
          <div className={'drawer'} style={{ top: marginTop }}>
            <Play
              currentTime={currentTime}
              volume={volume}
              playAudio={playAudio}
              pauseAudio={pauseAudio}
              handleVolumeChange={handleVolumeChange}
              adjustPlaybackProgress={adjustPlaybackProgress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Frame;
