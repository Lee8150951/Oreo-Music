import React, { useEffect, useState } from 'react';
import { type PropsType } from '../types/props';
import { useParams } from 'react-router-dom';
import playlistApi from '../http/apis/playlistApi';
import type ResponseType from '../types/res';
import { type SongType, type PlaylistDetailType } from './types/playlist';
import { Image, Tag } from 'tdesign-react';
import MusicCard from '../components/MusicCard';
import utils from '../util/utils';
import '../style/views/Playlist.scss';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Playlist: React.FC<Props> = (props): JSX.Element => {
  const { id } = useParams();
  const { setMusicSource } = props;

  /** state **/
  const [songs, setSongs] = useState<SongType[]>([]);
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistDetailType>();

  /** effect **/
  useEffect(() => {
    (async () => {
      const songRes = (await playlistApi.getSongFromPlaylist(id as string)) as ResponseType;
      const detailRes = (await playlistApi.getPlaylistDetail(id as string)) as ResponseType;
      const resSongs: SongType[] = songRes.songs;
      const resPlaylistDetail: PlaylistDetailType = detailRes.playlist;

      const uid = utils.storage.get('om_uid');
      if (uid !== null) {
        // Get favorite playlist and save
        const resFavor = (await playlistApi.getFavorPlaylist(uid)) as ResponseType;
        const favor: number[] = resFavor.ids;
        resSongs.map((item) => {
          item.favor = favor.includes(item.id);
          return item;
        });
      }
      setPlaylistInfo(resPlaylistDetail);
      setSongs(resSongs);
    })();
  }, [id]);

  /** methods **/

  /** render **/
  return (
    <div className={'playlist-main'}>
      <div className={'playlist-header-contain'}>
        <div className={'playlist-cover'}>
          <Image className={'playlist-cover-img'} src={playlistInfo?.coverImgUrl} overlayContent={<></>} />
        </div>
        <div className={'playlist-info'}>
          <h1 className={'playlist-info-title'}>{playlistInfo?.name}</h1>
          <h4 className={'playlist-info-creator'}>
            <span className={'created-by'}>Created by {playlistInfo?.creator.nickname}</span>
            <span className={'songs-account'}>{playlistInfo?.trackCount}首歌</span>
          </h4>
          {playlistInfo?.description != null ? (
            <div>
              <h3 className={'playlist-info-about-title'}>About</h3>
              <div className={'playlist-info-about'}>{playlistInfo.description}</div>
            </div>
          ) : (
            <></>
          )}
          <div className={'playlist-tags-panel'}>
            {playlistInfo?.tags.map((item, index) => (
              <Tag key={index} theme="primary" variant="light">
                {item}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <div className={'playlist-list-contain'}>
        {songs.map((item, index) => (
          <MusicCard pid={String(id)} key={item.id} music={item} favor={item.favor} setMusicSource={setMusicSource} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
