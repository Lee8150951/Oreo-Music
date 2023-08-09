import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import NavbarCard from './NavbarCard';
import { useAppSelector } from '../store/hooks';
import playlistApi from '../http/apis/playlistApi';
import type ResponseType from '../types/res';
import { type PlaylistType } from '../store/types/user';
import PlaylistCard from './PlaylistCard';
import { ChevronRightIcon, ChevronDownIcon } from 'tdesign-icons-react';
import '../style/components/SideNavbar.scss';

interface Props {
  children?: React.ReactNode;
}

const SideNavbar: React.FC<Props> = (props): JSX.Element => {
  const navbar = useAppSelector((state) => state.navbar);
  const userInfo = useAppSelector((state) => state.user);

  /** state **/
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [userPlaylist, setUserPlaylist] = useState<PlaylistType[]>([]);
  const [otherPlaylist, setOtherPlaylist] = useState<PlaylistType[]>([]);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [collapsePlaylist, setCollapsePlaylist] = useState<boolean>(true);
  // Animation control
  const [playlistHeight, setPlaylistHeight] = useState<number>(0);

  /** effect **/
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (userInfo.userId !== undefined) {
      (async () => {
        const uid: number = userInfo.userId;
        const res = (await playlistApi.getUserPlaylist(uid)) as ResponseType;
        const playlist: PlaylistType[] = res.playlist;
        const userPl: PlaylistType[] = [];
        const otherPl: PlaylistType[] = [];
        playlist.forEach((item) => {
          if (uid === item.userId) userPl.push(item);
          else otherPl.push(item);
        });
        setUserPlaylist(userPl);
        setOtherPlaylist(otherPl);
        setLoginStatus(true);
      })();
    } else {
      setLoginStatus(false);
    }
  }, [userInfo]);

  /** methods **/
  const collapseClick = () => {
    setCollapsePlaylist(!collapsePlaylist);
    if (playlistHeight === 0) {
      // Calculate the height of other collection lists
      const length = otherPlaylist.length;
      setPlaylistHeight(45 * length);
    } else {
      setPlaylistHeight(0);
    }
  };

  /** render **/
  return (
    <div className={'navbar-contain'} style={{ height: `${windowHeight - 60}px` }}>
      <div className={'navbar-logo-panel'}>
        <img className={'navbar-logo'} src={logo} alt="logo" />
        <div className={'logo-title'}>
          Oreo&apos;s Music<span style={{ color: '#008AF5' }}>.</span>
        </div>
      </div>
      <div className={'navbar-menu-panel'}>
        {navbar.map((item, index) => {
          return (
            <NavbarCard
              active={item.active}
              logo={item.logo}
              logoActive={item.logoActive}
              title={item.title}
              path={item.path}
              key={index}
            />
          );
        })}
      </div>
      {loginStatus ? (
        <div className={'navbar-playlist-panel'}>
          <div className={'navbar-playlist-title'}>我的歌单</div>
          {userPlaylist?.map((item, index) => (
            <PlaylistCard key={index} name={item.name} plid={item.id} />
          ))}
        </div>
      ) : (
        <></>
      )}
      {loginStatus ? (
        <div className={'navbar-playlist-panel'}>
          <div className={'navbar-playlist-title'}>
            <div>收藏歌单</div>
            {collapsePlaylist ? (
              <div className={'collapse-btn'} onClick={collapseClick}>
                <ChevronRightIcon />
              </div>
            ) : (
              <div className={'collapse-btn'} onClick={collapseClick}>
                <ChevronDownIcon />
              </div>
            )}
          </div>
          <div className={'animated-div'} style={{ height: playlistHeight }}>
            {otherPlaylist?.map((item, index) => (
              <PlaylistCard key={index} name={item.name} plid={item.id} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* Occupy mask */}
      <div className={'occupy-mask'}></div>
    </div>
  );
};

export default SideNavbar;
