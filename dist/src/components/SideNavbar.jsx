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
const logo_png_1 = __importDefault(require("../assets/logo.png"));
const NavbarCard_1 = __importDefault(require("./NavbarCard"));
const hooks_1 = require("../store/hooks");
const playlistApi_1 = __importDefault(require("../http/apis/playlistApi"));
const PlaylistCard_1 = __importDefault(require("./PlaylistCard"));
const tdesign_icons_react_1 = require("tdesign-icons-react");
require("../style/components/SideNavbar.scss");
const SideNavbar = (props) => {
    var _a;
    const navbar = (0, hooks_1.useAppSelector)((state) => state.navbar);
    const userInfo = (0, hooks_1.useAppSelector)((state) => state.user);
    /** state **/
    const [windowHeight, setWindowHeight] = (0, react_1.useState)(window.innerHeight);
    const [userPlaylist, setUserPlaylist] = (0, react_1.useState)([]);
    const [otherPlaylist, setOtherPlaylist] = (0, react_1.useState)([]);
    const [loginStatus, setLoginStatus] = (0, react_1.useState)(false);
    const [collapsePlaylist, setCollapsePlaylist] = (0, react_1.useState)(true);
    // Animation control
    const [playlistHeight, setPlaylistHeight] = (0, react_1.useState)(0);
    /** effect **/
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (userInfo.userId !== undefined) {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const uid = userInfo.userId;
                const res = (yield playlistApi_1.default.getUserPlaylist(uid));
                const playlist = res.playlist;
                const userPl = [];
                const otherPl = [];
                playlist.forEach((item) => {
                    if (uid === item.userId)
                        userPl.push(item);
                    else
                        otherPl.push(item);
                });
                setUserPlaylist(userPl);
                setOtherPlaylist(otherPl);
                setLoginStatus(true);
            }))();
        }
        else {
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
        }
        else {
            setPlaylistHeight(0);
        }
    };
    /** render **/
    return (<div className={'navbar-contain'} style={{ height: `${windowHeight - 60}px` }}>
      <div className={'navbar-logo-panel'}>
        <img className={'navbar-logo'} src={logo_png_1.default} alt="logo"/>
        <div className={'logo-title'}>
          Oreo&apos;s Music<span style={{ color: '#008AF5' }}>.</span>
        </div>
      </div>
      <div className={'navbar-menu-panel'}>
        {navbar.map((item, index) => {
            return (<NavbarCard_1.default active={item.active} logo={item.logo} logoActive={item.logoActive} title={item.title} path={item.path} key={index}/>);
        })}
      </div>
      {loginStatus ? (<div className={'navbar-playlist-panel'}>
          <div className={'navbar-playlist-title'}>我的歌单</div>
          {(_a = userPlaylist.slice(1, userPlaylist.length)) === null || _a === void 0 ? void 0 : _a.map((item, index) => (<PlaylistCard_1.default key={index} name={item.name} plid={item.id}/>))}
        </div>) : (<></>)}
      {loginStatus ? (<div className={'navbar-playlist-panel'}>
          <div className={'navbar-playlist-title'}>
            <div>收藏歌单</div>
            {collapsePlaylist ? (<div className={'collapse-btn'} onClick={collapseClick}>
                <tdesign_icons_react_1.ChevronRightIcon />
              </div>) : (<div className={'collapse-btn'} onClick={collapseClick}>
                <tdesign_icons_react_1.ChevronDownIcon />
              </div>)}
          </div>
          <div className={'animated-div'} style={{ height: playlistHeight }}>
            {otherPlaylist === null || otherPlaylist === void 0 ? void 0 : otherPlaylist.map((item, index) => (<PlaylistCard_1.default key={index} name={item.name} plid={item.id}/>))}
          </div>
        </div>) : (<></>)}
      {/* Occupy mask */}
      <div className={'occupy-mask'}></div>
    </div>);
};
exports.default = SideNavbar;
//# sourceMappingURL=SideNavbar.jsx.map