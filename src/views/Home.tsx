import React, { useEffect, useState } from 'react';
import { type PropsType } from '../types/props';
import homeApi from '../http/apis/homeApi';
import type ResponseType from '../types/res';
import { type PlaylistType, type SingerType, type AlbumType, type ToplistType } from './types/home';
import RecommendCard from '../components/RecommendCard';
import ArtistCard from '../components/ArtistCard';
import Recommend from '../assets/image/recommend.png';
import { Image } from 'tdesign-react';
import { ChevronRightIcon } from 'tdesign-icons-react';
import '../style/views/Home.scss';
import { useNavigate } from 'react-router-dom';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Home: React.FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate();
  const mask = <div className={'recommend-mask'}></div>;

  /** state **/
  const [playlist, setPlaylist] = useState<PlaylistType[]>([]);
  const [singer, setSinger] = useState<SingerType[]>([]);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [toplist, setToplist] = useState<ToplistType[]>([]);

  /** effect **/
  useEffect(() => {
    (async () => {
      const playlistRes = (await homeApi.getPlaylist()) as ResponseType;
      const singerRes = (await homeApi.getSinger()) as ResponseType;
      const albumRes = (await homeApi.getAlbum()) as ResponseType;
      const toplistRes = (await homeApi.getToplist()) as ResponseType;
      setPlaylist(playlistRes.result);
      setSinger(singerRes.artists);
      setAlbums(albumRes.albums);
      setToplist(toplistRes.list);
    })();
  }, []);

  /** methods **/
  const forYouClick = (item: PlaylistType) => {
    navigate(`/playlist/${item.id}`);
  };

  const albumClick = (item: AlbumType) => {
    navigate(`/album/${item.id}`);
  };

  const singerClick = (item: SingerType) => {
    navigate(`/singer/${item.id}`);
  };

  const chartsClick = (item: ToplistType) => {
    navigate(`/playlist/${item.id}`);
  };

  /** render **/
  return (
    <div className={'home-main'}>
      <div className={'recommend-list-contain'}>
        <div className={'recommend-list-title'}>
          For you
          <span className={'more-btn'}>
            <ChevronRightIcon />
          </span>
        </div>
        <div className={'recommend-list-panel'}>
          {playlist.slice(0, 5).map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginLeft: index % 5 === 0 ? '0px' : '15px',
                }}
                onClick={() => {
                  forYouClick(item);
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
          <div className={'daily-recommend-title'}>
            每日推荐
            <span className={'more-btn'}>
              <ChevronRightIcon />
            </span>
          </div>
          <div className={'daily-recommend-panel'}>
            <Image src={Recommend} className={'album-image'} fit="cover" overlayContent={mask} />
            <div className={'daily-recommend-info'}>
              <div>
                <div className={'recommend-title'}>City of Star</div>
                <div className={'recommend-singer'}>Ryan Gosling</div>
              </div>
            </div>
          </div>
        </div>
        <div className={'singer-list-contain'}>
          <div className={'singer-list-title'}>
            推荐艺人
            <span className={'more-btn'}>
              <ChevronRightIcon />
            </span>
          </div>
          <div className={'singer-list-panel'}>
            {singer.slice(0, 4).map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginLeft: index % 4 === 0 ? '0px' : '15px',
                  }}
                  onClick={() => {
                    singerClick(item);
                  }}
                >
                  <ArtistCard url={item.img1v1Url} name={item.name} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={'album-list-contain'}>
        <div className={'album-list-title'}>
          新碟上架
          <span className={'more-btn'}>
            <ChevronRightIcon />
          </span>
        </div>
        <div className={'album-list-panel'}>
          {albums.slice(0, 10).map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginLeft: index % 5 === 0 ? '0px' : '15px',
                  marginTop: index >= 5 ? '15px' : '0px',
                }}
                onClick={() => {
                  albumClick(item);
                }}
              >
                <RecommendCard picture={item.picUrl} title={item.name} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={'charts-list-contain'}>
        <div className={'charts-list-title'}>
          排行榜
          <span className={'more-btn'}>
            <ChevronRightIcon />
          </span>
        </div>
        <div className={'charts-list-panel'}>
          {toplist.slice(0, 5).map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginLeft: index % 5 === 0 ? '0px' : '15px',
                }}
                onClick={() => {
                  chartsClick(item);
                }}
              >
                <RecommendCard picture={item.coverImgUrl} title={item.name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
