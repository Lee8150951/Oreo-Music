import React, { useEffect, useState } from 'react';
import { type PropsType } from '../types/props';
import homeApi from '../http/apis/homeApi';
import type ResponseType from '../types/res';
import { type PlaylistType } from './types/home';
import RecommendCard from '../components/RecommendCard';
import '../style/views/Home.scss';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Home: React.FC<Props> = (props): JSX.Element => {
  /** state **/
  const [playlist, setPlaylist] = useState<PlaylistType[]>([]);

  /** effect **/
  useEffect(() => {
    (async () => {
      const playlistRes = (await homeApi.getPlaylist()) as ResponseType;
      setPlaylist(playlistRes.result);
    })();
  }, []);

  /** methods **/

  /** render **/
  return (
    <div className={'home-main'}>
      <div className={'recommend-list-contain'}>
        <div className={'recommend-list-title'}>For you</div>
        <div className={'recommend-list-panel'}>
          {playlist.slice(0, 5).map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginLeft: index % 5 === 0 ? '0px' : '15px',
                }}
              >
                <RecommendCard picture={item.picUrl} title={item.name} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={'other-recommend-contain'}>
        <div className={'daily-recommend-contain'}>
          <div className={'daily-recommend-title'}>每日推荐</div>
        </div>
        <div className={'singer-list-contain'}>
          <div className={'singer-list-title'}>推荐艺人</div>
        </div>
      </div>
      <div className={'album-list-contain'}>
        <div className={'album-list-title'}>新碟上架</div>
      </div>
      <div className={'charts-list-contain'}>
        <div className={'charts-list-title'}>排行榜</div>
      </div>
    </div>
  );
};

export default Home;
