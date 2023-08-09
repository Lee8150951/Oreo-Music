import React, { useEffect, useState } from 'react';
import { type PropsType } from '../types/props';
import { useParams } from 'react-router-dom';
import playlistApi from '../http/apis/playlistApi';
import type ResponseType from '../types/res';
import { type SongType } from './types/playlist';
import '../style/views/Playlist.scss';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Playlist: React.FC<Props> = (props): JSX.Element => {
  const { id } = useParams();

  /** state **/
  const [songs, setSongs] = useState<SongType[]>([]);

  /** effect **/
  useEffect(() => {
    (async () => {
      const res = (await playlistApi.getSongFromPlaylist(id as string)) as ResponseType;
      const resSongs = res.songs;
      setSongs(resSongs);
    })();
  }, [id]);

  /** methods **/

  /** render **/
  return (
    <div>
      <div>播放列表</div>
      {songs.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </div>
  );
};

export default Playlist;
