import React, { useEffect, useState } from 'react';
import { type PropsType } from '../types/props';
import { Image } from 'tdesign-react';
import loginApi from '../http/apis/loginApi';
import { ChevronRightIcon } from 'tdesign-icons-react';
import type ResponseType from '../types/res';
import utils from '../util/utils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { saveUser } from '../store/slices/userSlice';
import { type UserType } from '../store/types/user';
import LoginBG from '../assets/background/login-bg.png';
import logo from '../assets/logo.png';
import '../style/views/Login.scss';

interface Props extends PropsType {
  children?: React.ReactNode;
}

const Login: React.FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /** state **/
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [qrImg, setQrImg] = useState<string>('');

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

  // Initialize QR code
  useEffect(() => {
    (async () => {
      const [qrImgRes, qrKey] = await loginApi.getLoginCode();
      setQrImg(qrImgRes);
      const timer = setInterval(() => {
        (async () => {
          const statusRes = (await loginApi.getCheckStatus(qrKey)) as ResponseType;
          const code = statusRes.code;
          if (code === 800) {
            // Time out
            clearInterval(timer);
          } else if (code === 803) {
            // Successfully logged in
            clearInterval(timer);
            const cookie = statusRes.cookie;
            // Save token
            utils.storage.set('tk', cookie);
            // Save profile to redux
            const userInfo = (await loginApi.getUserStatus(cookie)) as UserType;
            dispatch(saveUser(userInfo));
            console.log(userInfo);
          }
        })();
      }, 3000);
    })();
  }, []);

  /** methods **/
  const backClick = () => {
    navigate('/');
  };

  /** render **/
  return (
    <div className={'login-page-main'}>
      <div className={'login-form-contain'}>
        <div className={'login-logo-panel'}>
          <img className={'login-logo'} src={logo} alt="logo" />
          <div className={'logo-title'}>
            Oreo&apos;s Music<span style={{ color: '#008AF5' }}>.</span>
          </div>
        </div>
        <div className={'qr-code-contain'}>
          <div className={'qr-code-top-title'}>SCAN THE CODE TO LOG IN</div>
          <div className={'qr-code-title'}>
            请扫码登录
            <span style={{ color: '#008AF5', fontSize: '50px', lineHeight: '20px', marginLeft: '5px' }}>.</span>
          </div>
          <div className={'qr-panel-border'}>
            <div className={'qr-panel'}>
              <img className={'qr-img'} src={qrImg} alt="QR" />
            </div>
          </div>
          <div className={'back-page'}>
            <div>
              <ChevronRightIcon size="2em" />
            </div>
            <div className={'back-title'}>.&nbsp;&nbsp;使用游客身份的使用？</div>
            <div className={'back-btn'} onClick={backClick}>
              返回
            </div>
          </div>
        </div>
      </div>
      <div className={'login-bg'}>
        <Image
          src={LoginBG}
          fit="cover"
          overlayContent={<div></div>}
          style={{
            height: windowHeight,
            backgroundColor: '#FFFFFF',
          }}
        />
      </div>
    </div>
  );
};

export default Login;
