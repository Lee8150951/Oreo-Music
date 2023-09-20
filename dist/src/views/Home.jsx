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
const homeApi_1 = __importDefault(require("../http/apis/homeApi"));
const RecommendCard_1 = __importDefault(require("../components/RecommendCard"));
const ArtistCard_1 = __importDefault(require("../components/ArtistCard"));
const recommend_png_1 = __importDefault(require("../assets/image/recommend.png"));
const tdesign_react_1 = require("tdesign-react");
const tdesign_icons_react_1 = require("tdesign-icons-react");
require("../style/views/Home.scss");
const react_router_dom_1 = require("react-router-dom");
const Home = (props) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const mask = <div className={'recommend-mask'}></div>;
    /** state **/
    const [playlist, setPlaylist] = (0, react_1.useState)([]);
    const [singer, setSinger] = (0, react_1.useState)([]);
    const [albums, setAlbums] = (0, react_1.useState)([]);
    const [toplist, setToplist] = (0, react_1.useState)([]);
    /** effect **/
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const playlistRes = (yield homeApi_1.default.getPlaylist());
            const singerRes = (yield homeApi_1.default.getSinger());
            const albumRes = (yield homeApi_1.default.getAlbum());
            const toplistRes = (yield homeApi_1.default.getToplist());
            setPlaylist(playlistRes.result);
            setSinger(singerRes.artists);
            setAlbums(albumRes.albums);
            setToplist(toplistRes.list);
        }))();
    }, []);
    /** methods **/
    const forYouClick = (item) => {
        navigate(`/playlist/${item.id}`);
    };
    /** render **/
    return (<div className={'home-main'}>
      <div className={'recommend-list-contain'}>
        <div className={'recommend-list-title'}>
          For you
          <span className={'more-btn'}>
            <tdesign_icons_react_1.ChevronRightIcon />
          </span>
        </div>
        <div className={'recommend-list-panel'}>
          {playlist.slice(0, 5).map((item, index) => {
            return (<div key={index} style={{
                    marginLeft: index % 5 === 0 ? '0px' : '15px',
                }} onClick={() => {
                    forYouClick(item);
                }}>
                <RecommendCard_1.default picture={item.picUrl} title={item.name}/>
              </div>);
        })}
        </div>
      </div>
      <div className={'other-recommend-contain'}>
        <div className={'daily-recommend-contain'}>
          <div className={'daily-recommend-title'}>
            每日推荐
            <span className={'more-btn'}>
              <tdesign_icons_react_1.ChevronRightIcon />
            </span>
          </div>
          <div className={'daily-recommend-panel'}>
            <tdesign_react_1.Image src={recommend_png_1.default} className={'album-image'} fit="cover" overlayContent={mask}/>
            <div className={'daily-recommend-info'}>
              <div>
                <div className={'recommend-title'}>City of Star</div>
                <div className={'recommend-singer'}>Ryan Gosling</div>
              </div>
            </div>
          </div>
        </div>
        <div className={'singer-list-contain'}>
          <div className={'singer-list-title'}>
            推荐艺人
            <span className={'more-btn'}>
              <tdesign_icons_react_1.ChevronRightIcon />
            </span>
          </div>
          <div className={'singer-list-panel'}>
            {singer.slice(0, 4).map((item, index) => {
            return (<div key={index} style={{
                    marginLeft: index % 4 === 0 ? '0px' : '15px',
                }}>
                  <ArtistCard_1.default url={item.img1v1Url} name={item.name}/>
                </div>);
        })}
          </div>
        </div>
      </div>
      <div className={'album-list-contain'}>
        <div className={'album-list-title'}>
          新碟上架
          <span className={'more-btn'}>
            <tdesign_icons_react_1.ChevronRightIcon />
          </span>
        </div>
        <div className={'album-list-panel'}>
          {albums.slice(0, 10).map((item, index) => {
            return (<div key={index} style={{
                    marginLeft: index % 5 === 0 ? '0px' : '15px',
                    marginTop: index >= 5 ? '15px' : '0px',
                }}>
                <RecommendCard_1.default picture={item.picUrl} title={item.name}/>
              </div>);
        })}
        </div>
      </div>
      <div className={'charts-list-contain'}>
        <div className={'charts-list-title'}>
          排行榜
          <span className={'more-btn'}>
            <tdesign_icons_react_1.ChevronRightIcon />
          </span>
        </div>
        <div className={'charts-list-panel'}>
          {toplist.slice(0, 5).map((item, index) => {
            return (<div key={index} style={{
                    marginLeft: index % 5 === 0 ? '0px' : '15px',
                }}>
                <RecommendCard_1.default picture={item.coverImgUrl} title={item.name}/>
              </div>);
        })}
        </div>
      </div>
    </div>);
};
exports.default = Home;
//# sourceMappingURL=Home.jsx.map