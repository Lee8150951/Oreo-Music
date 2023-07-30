import React, { useEffect, useState } from 'react';
import '../style/components/SideNavbar.scss';
import logo from '../assets/logo.png';
import NavbarCard from './NavbarCard';
import { useAppSelector } from '../store/hooks';

interface Props {
  children?: React.ReactNode;
}

const SideNavbar: React.FC<Props> = (props): JSX.Element => {
  const navbar = useAppSelector((state) => state.navbar);
  /** state **/
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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
      </div>
    </div>
  );
};

export default SideNavbar;
