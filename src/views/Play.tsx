import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from 'tdesign-icons-react';
import PubSub from 'pubsub-js';
import LyricsBackground from '../components/LyricsBackground';
import '../style/views/Play.scss';

interface Props {
  children?: React.ReactNode;
}

const Play: React.FC<Props> = (props): JSX.Element => {
  /** state **/
  const [colorList, setColorList] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  /** effect **/
  useEffect(() => {
    (async () => {
      const res = await window.ipcChannel.getMainColor(
        'https://oreo-image-bed-1310232028.cos.ap-shanghai.myqcloud.com/image/202306132204595.png'
      );
      setColorList(res);
      setIsLoad(true);
    })();
  }, []);

  /** methods **/
  const unfoldHandle = () => {
    PubSub.publish('drawer', false);
  };

  /** render **/
  if (!isLoad) return <div></div>;

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
