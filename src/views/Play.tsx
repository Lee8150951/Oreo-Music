import React, { useEffect } from 'react';
import { ChevronDownIcon } from 'tdesign-icons-react';
import PubSub from 'pubsub-js';
import LyricsBackground from '../components/LyricsBackground';
import '../style/views/Play.scss';

interface Props {
  children?: React.ReactNode;
}

const Play: React.FC<Props> = (props): JSX.Element => {
  /** state **/

  /** effect **/
  useEffect(() => {
    console.log(window.environmentChannel.node());
  }, []);

  /** methods **/
  const unfoldHandle = () => {
    PubSub.publish('drawer', false);
  };

  /** render **/
  return (
    <div className={'play-main'}>
      <LyricsBackground colors={['red', 'green', 'blue', 'orange']} />
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
