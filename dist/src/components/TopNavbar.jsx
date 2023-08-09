"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const tdesign_react_1 = require("tdesign-react");
const react_router_dom_1 = require("react-router-dom");
const userApi_1 = __importDefault(require("../http/apis/userApi"));
const utils_1 = __importDefault(require("../util/utils"));
const tdesign_icons_react_1 = require("tdesign-icons-react");
const loginApi_1 = __importDefault(require("../http/apis/loginApi"));
const hooks_1 = require("../store/hooks");
const userSlice_1 = require("../store/slices/userSlice");
require("../style/components/TopNavbar.scss");
const TopNavbar = (props) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const optionsLogin = [
        {
            content: '设置',
            value: '/setting',
            prefixIcon: <tdesign_icons_react_1.SettingIcon />,
            divider: true,
        },
        {
            content: '退出',
            value: 'logout',
            prefixIcon: <tdesign_icons_react_1.LogoutIcon />,
        },
    ];
    const optionsNotLogin = [
        {
            content: '设置',
            value: '/setting',
            prefixIcon: <tdesign_icons_react_1.SettingIcon />,
            divider: true,
        },
        {
            content: '登录',
            value: '/login',
            prefixIcon: <tdesign_icons_react_1.LoginIcon />,
        },
    ];
    /** state **/
    const [loginStatus, setLoginStatus] = (0, react_1.useState)(false);
    const [userName, setUserName] = (0, react_1.useState)('');
    const [userAvatar, setUserAvatar] = (0, react_1.useState)('https://oreo-image-bed-1310232028.cos.ap-shanghai.myqcloud.com/image/avatar.png');
    /** effect **/
    (0, react_1.useEffect)(() => {
        const uid = utils_1.default.storage.get('om_uid');
        const tk = utils_1.default.storage.get('om_tk');
        if (uid === null && tk === null) {
            setLoginStatus(false);
        }
        else {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const userInfo = (yield userApi_1.default.getUserInfo(uid));
                setUserName(userInfo.profile.nickname);
                setUserAvatar(userInfo.profile.avatarUrl);
                dispatch((0, userSlice_1.saveUser)(userInfo.profile));
            }))();
            setLoginStatus(true);
        }
    }, []);
    /** methods **/
    const clickHandler = (data) => {
        if (data.value === 'logout') {
            utils_1.default.storage.remove('om_uid');
            utils_1.default.storage.remove('om_tk');
            (() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield loginApi_1.default.userLogout();
                    yield tdesign_react_1.NotificationPlugin.warning({
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
                }
                catch (_) { }
            }))();
        }
        else {
            navigate(data.value);
        }
    };
    /** render **/
    return (<div className={'top-navbar-main'}>
      <div className={'search-bar'}>
        <tdesign_react_1.Input prefixIcon={<tdesign_icons_react_1.SearchIcon />} placeholder="搜索" align="left" size="medium" status="default" type="text"/>
      </div>
      <div className={'user-bar'}>
        <div className={'user-name'}>{userName}</div>
        <div className={'user-avatar'}>
          {!loginStatus ? (<tdesign_react_1.Dropdown options={optionsNotLogin} onClick={clickHandler} trigger="click">
              <div className={'drop-list'}>
                <tdesign_react_1.Avatar image={userAvatar} shape="circle"/>
                <tdesign_icons_react_1.Icon className={'down-icon'} name="chevron-down" size="16"/>
              </div>
            </tdesign_react_1.Dropdown>) : (<tdesign_react_1.Dropdown options={optionsLogin} onClick={clickHandler} trigger="click">
              <div className={'drop-list'}>
                <tdesign_react_1.Avatar image={userAvatar} shape="circle"/>
                <tdesign_icons_react_1.Icon className={'down-icon'} name="chevron-down" size="16"/>
              </div>
            </tdesign_react_1.Dropdown>)}
        </div>
      </div>
    </div>);
};
exports.default = TopNavbar;
//# sourceMappingURL=TopNavbar.jsx.map