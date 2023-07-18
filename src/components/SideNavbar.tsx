import React, { useEffect, useState } from 'react';
import { Menu } from 'tdesign-react';
import '../style/components/SideNavbar.scss';

interface Props {
  children?: React.ReactNode;
}

const SideNavbar: React.FC<Props> = (props): JSX.Element => {
  const { MenuItem } = Menu;
  const Logo = () => <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />;

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
    <Menu style={{ width: '100%', height: `${windowHeight - 60}px`, boxShadow: 'none' }} logo={<Logo />} {...props}>
      <MenuItem value="1">侧边内容一</MenuItem>
      <MenuItem value="2">侧边内容二</MenuItem>
      <MenuItem value="3">侧边内容三</MenuItem>
      <MenuItem value="4">侧边内容四</MenuItem>
      <MenuItem value="5">侧边内容无</MenuItem>
    </Menu>
  );
};

export default SideNavbar;
