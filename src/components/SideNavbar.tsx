import React, { useEffect, useState } from 'react';
import '../style/components/SideNavbar.scss';
import logo from '../assets/logo.png';
import NavbarCard from './NavbarCard';
import home from '../assets/icon/home.png';
import homeActive from '../assets/icon/home-active.png';
import focus from '../assets/icon/focus.png';
import focusActive from '../assets/icon/focus-active.png';
import download from '../assets/icon/download.png';
import downloadActive from '../assets/icon/download-active.png';
import cloud from '../assets/icon/cloud.png';
import cloudActive from '../assets/icon/cloud-active.png';

interface Props {
  children?: React.ReactNode;
}

const SideNavbar: React.FC<Props> = (props): JSX.Element => {
  /** state **/
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [navlist] = useState([
    {
      title: '发现',
      logo: home,
      logoActive: homeActive,
      active: true,
      path: '',
    },
    {
      title: '关注',
      logo: focus,
      logoActive: focusActive,
      active: false,
      path: '',
    },
    {
      title: '下载',
      logo: download,
      logoActive: downloadActive,
      active: false,
      path: '',
    },
    {
      title: '云盘',
      logo: cloud,
      logoActive: cloudActive,
      active: false,
      path: '',
    },
  ]);

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

  /** methods **/

  /** render **/
  return (
    <div className={'navbar-contain'} style={{ height: `${windowHeight - 60}px` }}>
      <div className={'navbar-logo-panel'}>
        <img className={'navbar-logo'} src={logo} alt="logo" />
        <div className={'logo-title'}>Oreo&apos;s Music</div>
      </div>
      <div className={'navbar-menu-panel'}>
        {navlist.map((item, index) => {
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
        <div>歌单</div>
      </div>
    </div>
  );
};

export default SideNavbar;
