import React, { useState } from 'react';
import { type SongType } from '../views/types/playlist';
import { Row, Col, Image, MessagePlugin } from 'tdesign-react';
import utils from '../util/utils';
import UnfavorSVG from '../assets/svg/unfavor.svg';
import FavorSVG from '../assets/svg/favor.svg';
import playlistApi from '../http/apis/playlistApi';
import playApi from '../http/apis/playApi';
import PubSub from 'pubsub-js';
import { PLAY } from '../event-types';
import { useAppDispatch } from '../store/hooks';
import { changePlay } from '../store/slices/playSlice';
import { type PlaySongType } from '../store/types/play';
import type ResponseType from '../types/res';
import { type PlaylistItemType } from '../store/types/playlist';
import '../style/components/MusicCard.scss';
import { changePlaylist } from '../store/slices/playlistSlice';

interface Props {
  children?: React.ReactNode;
  music: SongType;
  favor: boolean;
  pid?: string;
  setMusicSource?: (url: string) => void;
}

const MusicCard: React.FC<Props> = (props: Props): JSX.Element => {
  const { music, favor, setMusicSource, pid } = props;
  const dispatch = useAppDispatch();

  /** state **/
  const [isFavor, setIsFavor] = useState<boolean>(favor);

  /** effect **/

  /** methods **/
  const clickHandle = () => {
    (async () => {
      const res = (await playApi.getSongUrl(String(music.id), 'exhigh')) as ResponseType;
      const songDetail = (await playApi.getSongDetail(String(music.id))) as ResponseType;
      const songLyric = (await playApi.getSongLyric(String(music.id))) as ResponseType;
      const { url, type, size } = res.data[0];
      const { dt } = songDetail.songs[0];
      const { lyric } = songLyric.lrc;
      // Public event
      PubSub.publish(PLAY, music.id);
      // Save music info
      const currentSong: PlaySongType = {
        id: music.id,
        name: music.name,
        url,
        type,
        lyric,
        // unit: second
        time: Math.floor(dt / 1000),
        size,
        coverImgUrl: music.al.picUrl,
        artists: music.ar,
        album: music.al,
      };
      dispatch(changePlay(currentSong));
      setMusicSource?.(url);

      // Modify the current playlist
      const playlist = (await playlistApi.getSongFromPlaylist(String(pid))) as ResponseType;
      const songs = playlist.songs as Array<{ id: string; name: string }>;
      const curPlaylist: PlaylistItemType[] = [];
      songs.forEach((item) => {
        curPlaylist.push({
          sid: item.id,
          name: item.name,
        });
      });
      dispatch(changePlaylist(curPlaylist));
    })();
  };

  const favorClick = () => {
    try {
      (async () => {
        setIsFavor(!isFavor);
        await playlistApi.addFavorMusic(music.id, !isFavor);
      })();
    } catch (_) {
      MessagePlugin.warning('喜欢失败', 3 * 1000);
    }
  };

  /** render **/
  return (
    <div onDoubleClick={clickHandle}>
      <Row className={'music-card-main'}>
        <Col span={3} className={'music-card-header'}>
          <div className={'album-cover'}>
            <Image className={'album-cover-img'} src={music.al.picUrl} fit="cover" shape="round" />
          </div>
          <div className={'music-info-panel'}>
            <span className={'music-name'}>{music.name}</span>
            <br />
            <span className={'music-album'}>{music.al.name}</span>
          </div>
        </Col>
        <Col span={6} className={'music-card-middle'}>
          {music.ar.slice(0, 2).map((item, index) => {
            if (music.ar.length !== 1 && index !== 1) {
              return (
                <span key={index} className={'music-artist'}>
                  {item.name},&nbsp;
                </span>
              );
            } else {
              return (
                <span key={index} className={'music-artist'}>
                  {item.name}
                </span>
              );
            }
          })}
        </Col>
        <Col span={3} className={'music-card-tail'}>
          <div className={'favor-contain'} onClick={favorClick}>
            {isFavor ? (
              <Image src={FavorSVG} className={'favor-icon'} />
            ) : (
              <Image src={UnfavorSVG} className={'favor-icon'} />
            )}
          </div>
          <div className={'music-dt'}>{utils.formatMillisecondsToMinutesSeconds(music.dt)}</div>
        </Col>
      </Row>
    </div>
  );
};

export default MusicCard;
