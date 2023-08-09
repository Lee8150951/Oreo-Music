import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import NavbarCard from './NavbarCard';
import { useAppSelector } from '../store/hooks';
import userApi from '../http/apis/userApi';
import type ResponseType from '../types/res';
import { type PlaylistType } from '../store/types/user';
import PlaylistCard from './PlaylistCard';
import '../style/components/SideNavbar.scss';

interface Props {
  children?: React.ReactNode;
}

const SideNavbar: React.FC<Props> = (props): JSX.Element => {
  const navbar = useAppSelector((state) => state.navbar);
  const userInfo = useAppSelector((state) => state.user);

  /** state **/
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [playlist, setPlaylist] = useState<PlaylistType[]>();

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
        const uid: string = userInfo.userId;
        const res = (await userApi.getUserPlaylist(uid)) as ResponseType;
        const playlist: PlaylistType[] = res.playlist;
        setPlaylist(playlist);
      })();
    }
  }, [userInfo]);

  /** methods **/

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
      <div className={'navbar-playlist-panel'}>
        <div className={'navbar-playlist-title'}>歌单</div>
        {playlist?.map((item, index) => (
          <PlaylistCard key={index} name={item.name} />
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
