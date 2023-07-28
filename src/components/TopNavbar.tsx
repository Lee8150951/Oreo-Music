import React from 'react';
import { Input, Dropdown, Avatar } from 'tdesign-react';
import { SearchIcon, Icon, SettingIcon, LoginIcon } from 'tdesign-icons-react';
import '../style/components/TopNavbar.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

const TopNavbar: React.FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate();
  const options = [
    {
      content: '设置',
      value: '/setting',
      prefixIcon: <SettingIcon />,
      divider: true,
    },
    {
      content: '登录',
      value: '/login',
      prefixIcon: <LoginIcon />,
    },
  ];
  /** state **/

  /** effect **/

  /** methods **/
  const clickHandler = (data: any) => {
    navigate(data.value);
  };

  /** render **/
  return (
    <div className={'top-navbar-main'}>
      <div className={'search-bar'}>
        <Input prefixIcon={<SearchIcon />} placeholder="搜索" align="left" size="medium" status="default" type="text" />
      </div>
      <div className={'user-bar'}>
        <div className={'user-name'}>Ethan</div>
        <div className={'user-avatar'}>
          <Dropdown options={options} onClick={clickHandler} trigger="click">
            <div className={'drop-list'}>
              <Avatar
                image="https://oreo-image-bed-1310232028.cos.ap-shanghai.myqcloud.com/image/v2-b45cee193b6ed9667e03a389fbcb0891_b.jpg"
                shape="circle"
              />
              <Icon className={'down-icon'} name="chevron-down" size="16" />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
