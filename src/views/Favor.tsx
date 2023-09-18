import React, { useEffect, useState } from 'react';
import { type PropsType } from '../types/props';
import { Image } from 'tdesign-react';
import MusicCard from '../components/MusicCard';
import { type SongType } from './types/playlist';
import favorApi from '../http/apis/favorApi';
import utils from '../util/utils';
import { type FavorType } from './types/favor';
import '../style/views/Favor.scss';
import playlistApi from '../http/apis/playlistApi';
import type ResponseType from '../types/res';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Favor: React.FC<Props> = (props): JSX.Element => {
  /** state **/
  const [songs, setSongs] = useState<SongType[]>([]);
  const [favorInfo, setFavorInfo] = useState<FavorType>();
  const [pid, setPid] = useState<string>('');

  /** effect **/
  useEffect(() => {
    (async () => {
      const uid = utils.storage.get('om_uid');
      if (uid === null) {
        console.log('还没有登录');
      } else {
        const favorRes = (await favorApi.getAllFavor(uid)) as FavorType;
        const songs = favorRes.tracks;
        // Get favorite playlist and save
        const resFavor = (await playlistApi.getFavorPlaylist(uid)) as ResponseType;
        setPid(favorRes.id);
        const favor: number[] = resFavor.ids;
        songs.map((item) => {
          item.favor = favor.includes(item.id);
          return item;
        });
        setFavorInfo(favorRes);
        setSongs(songs);
      }
    })();
  }, []);

  /** methods **/

  /** render **/
  return (
    <div className={'favor-main'}>
      <div className={'favor-header-contain'}>
        <div className={'favor-cover'}>
          <Image className={'favor-cover-img'} src={favorInfo?.coverImgUrl} overlayContent={<></>} />
        </div>
        <div className={'favor-info'}>
          <h1 className={'favor-info-title'}>{favorInfo?.name}</h1>
          <h4 className={'favor-info-creator'}>
            <span className={'songs-account'}>{favorInfo?.trackCount}首歌</span>
          </h4>
        </div>
      </div>
      <div className={'favor-list-contain'}>
        {songs.map((item, index) => (
          <MusicCard pid={pid} key={item.id} music={item} favor={item.favor} />
        ))}
      </div>
    </div>
  );
};

export default Favor;
