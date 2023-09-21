import React, { useEffect, useRef, useState } from 'react';
import { Input, Dropdown, Avatar, NotificationPlugin } from 'tdesign-react';
import { useNavigate } from 'react-router-dom';
import userApi from '../http/apis/userApi';
import utils from '../util/utils';
import { SearchIcon, Icon, SettingIcon, LoginIcon, LogoutIcon } from 'tdesign-icons-react';
import loginApi from '../http/apis/loginApi';
import { useAppDispatch } from '../store/hooks';
import { saveUser } from '../store/slices/userSlice';
import { type UserType } from '../store/types/user';
import '../style/components/TopNavbar.scss';

interface Props {
  children?: React.ReactNode;
}

const TopNavbar: React.FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useAppDispatch();
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
  const searchRef = useRef(null);

  /** state **/
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>(
    'https://oreo-image-bed-1310232028.cos.ap-shanghai.myqcloud.com/image/avatar.png'
  );
  // const [showBack, setShowBack] = useState<boolean>(false);

  /** effect **/
  useEffect(() => {
    const uid = utils.storage.get('om_uid');
    const tk = utils.storage.get('om_tk');
    if (uid === null && tk === null) {
      setLoginStatus(false);
    } else {
      (async () => {
        // Save user info
        const userInfo = (await userApi.getUserInfo(uid)) as UserType;
        setUserName(userInfo.profile.nickname);
        setUserAvatar(userInfo.profile.avatarUrl);
        dispatch(saveUser(userInfo.profile));
      })();
      setLoginStatus(true);
    }
  }, []);
  //
  // useEffect(() => {
  //   const { pathname } = location;
  //   const allowList = ['/', '/cloud', '/download', '/favor'];
  //   const searchElement = searchRef.current;
  //   if (!allowList.includes(pathname)) {
  //     setShowBack(false);
  //     if (searchElement !== null) {
  //       (searchElement as HTMLDivElement).style.width = 'calc(80% - 50px)';
  //     }
  //   } else {
  //     setShowBack(true);
  //     if (searchElement !== null) {
  //       (searchElement as HTMLDivElement).style.width = '100%';
  //     }
  //   }
  // }, [location]);

  /** methods **/
  const clickHandler = (data: any) => {
    if (data.value === 'logout') {
      utils.storage.remove('om_uid');
      utils.storage.remove('om_tk');
      (async () => {
        try {
          await loginApi.userLogout();
          await NotificationPlugin.warning({
            title: '消息',
            content: '退出登录成功',
            placement: 'top-right',
            duration: 3000,
            offset: [-30, 30],
            closeBtn: true,
          });
          setLoginStatus(false);
          setUserName('');
          setUserAvatar('https://oreo-image-bed-1310232028.cos.ap-shanghai.myqcloud.com/image/avatar.png');
        } catch (_) {}
      })();
    } else {
      navigate(data.value);
    }
  };

  // const backClick = () => {};

  /** render **/
  return (
    <div className={'top-navbar-main'}>
      {/* {showBack ? ( */}
      {/*  <></> */}
      {/* ) : ( */}
      {/*  <div className={'back-btn'} onClick={backClick}> */}
      {/*    <ChevronLeftIcon /> */}
      {/*  </div> */}
      {/* )} */}
      <div className={'search-bar'} ref={searchRef}>
        <Input prefixIcon={<SearchIcon />} placeholder="搜索" align="left" size="medium" status="default" type="text" />
      </div>
      <div className={'user-bar'}>
        <div className={'user-name'}>{userName}</div>
        <div className={'user-avatar'}>
          {!loginStatus ? (
            <Dropdown options={optionsNotLogin} onClick={clickHandler} trigger="click">
              <div className={'drop-list'}>
                <Avatar image={userAvatar} shape="circle" />
                <Icon className={'down-icon'} name="chevron-down" size="16" />
              </div>
            </Dropdown>
          ) : (
            <Dropdown options={optionsLogin} onClick={clickHandler} trigger="click">
              <div className={'drop-list'}>
                <Avatar image={userAvatar} shape="circle" />
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
