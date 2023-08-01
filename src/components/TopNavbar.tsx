import React, { useEffect, useState } from 'react';
import { Input, Dropdown, Avatar } from 'tdesign-react';
import { useNavigate } from 'react-router-dom';
import userApi from '../http/apis/userApi';
import utils from '../util/utils';
import { SearchIcon, Icon, SettingIcon, LoginIcon, LogoutIcon } from 'tdesign-icons-react';
import '../style/components/TopNavbar.scss';
import loginApi from '../http/apis/loginApi';

interface Props {
  children?: React.ReactNode;
}

const TopNavbar: React.FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate();
  const optionsLogin = [
    {
      content: '设置',
      value: '/setting',
      prefixIcon: <SettingIcon />,
      divider: true,
    },
    {
      content: '退出',
      value: 'logout',
      prefixIcon: <LogoutIcon />,
    },
  ];
  const optionsNotLogin = [
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
  const [loginStatus, setLoginStatus] = useState(false);

  /** effect **/
  useEffect(() => {
    const uid = utils.storage.get('om_uid');
    const tk = utils.storage.get('om_tk');
    if (uid === null && tk === null) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
    }
  }, []);
  useEffect(() => {
    (async () => {
      const uid = utils.storage.get('om_uid');
      console.log(await userApi.getUserInfo(uid));
    })();
  }, []);

  /** methods **/
  const clickHandler = (data: any) => {
    if (data.value === 'logout') {
      utils.storage.remove('om_uid');
      utils.storage.remove('om_tk');
      (async () => {
        await loginApi.userLogout();
      })();
    } else {
      navigate(data.value);
    }
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
          {!loginStatus ? (
            <Dropdown options={optionsNotLogin} onClick={clickHandler} trigger="click">
              <div className={'drop-list'}>
                <Avatar
                  image="https://oreo-image-bed-1310232028.cos.ap-shanghai.myqcloud.com/image/v2-b45cee193b6ed9667e03a389fbcb0891_b.jpg"
                  shape="circle"
                />
                <Icon className={'down-icon'} name="chevron-down" size="16" />
              </div>
            </Dropdown>
          ) : (
            <Dropdown options={optionsLogin} onClick={clickHandler} trigger="click">
              <div className={'drop-list'}>
                <Avatar
                  image="https://oreo-image-bed-1310232028.cos.ap-shanghai.myqcloud.com/image/v2-b45cee193b6ed9667e03a389fbcb0891_b.jpg"
                  shape="circle"
                />
                <Icon className={'down-icon'} name="chevron-down" size="16" />
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
