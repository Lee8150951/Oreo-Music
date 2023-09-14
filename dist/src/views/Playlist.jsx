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
const react_router_dom_1 = require("react-router-dom");
const playlistApi_1 = __importDefault(require("../http/apis/playlistApi"));
const tdesign_react_1 = require("tdesign-react");
const MusicCard_1 = __importDefault(require("../components/MusicCard"));
const utils_1 = __importDefault(require("../util/utils"));
require("../style/views/Playlist.scss");
const Playlist = (props) => {
    const { id } = (0, react_router_dom_1.useParams)();
    const { setMusicSource, playAudio } = props;
    /** state **/
    const [songs, setSongs] = (0, react_1.useState)([]);
    const [playlistInfo, setPlaylistInfo] = (0, react_1.useState)();
    /** effect **/
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const songRes = (yield playlistApi_1.default.getSongFromPlaylist(id));
            const detailRes = (yield playlistApi_1.default.getPlaylistDetail(id));
            const resSongs = songRes.songs;
            const resPlaylistDetail = detailRes.playlist;
            const uid = utils_1.default.storage.get('om_uid');
            if (uid !== null) {
                // Get favorite playlist and save
                const resFavor = (yield playlistApi_1.default.getFavorPlaylist(uid));
                const favor = resFavor.ids;
                resSongs.map((item) => {
                    item.favor = favor.includes(item.id);
                    return item;
                });
            }
            setPlaylistInfo(resPlaylistDetail);
            setSongs(resSongs);
        }))();
    }, [id]);
    /** methods **/
    /** render **/
    return (<div className={'playlist-main'}>
      <div className={'playlist-header-contain'}>
        <div className={'playlist-cover'}>
          <tdesign_react_1.Image className={'playlist-cover-img'} src={playlistInfo === null || playlistInfo === void 0 ? void 0 : playlistInfo.coverImgUrl} overlayContent={<></>}/>
        </div>
        <div className={'playlist-info'}>
          <h1 className={'playlist-info-title'}>{playlistInfo === null || playlistInfo === void 0 ? void 0 : playlistInfo.name}</h1>
          <h4 className={'playlist-info-creator'}>
            <span className={'created-by'}>Created by {playlistInfo === null || playlistInfo === void 0 ? void 0 : playlistInfo.creator.nickname}</span>
            <span className={'songs-account'}>{playlistInfo === null || playlistInfo === void 0 ? void 0 : playlistInfo.trackCount}首歌</span>
          </h4>
          {(playlistInfo === null || playlistInfo === void 0 ? void 0 : playlistInfo.description) != null ? (<div>
              <h3 className={'playlist-info-about-title'}>About</h3>
              <div className={'playlist-info-about'}>{playlistInfo.description}</div>
            </div>) : (<></>)}
          <div className={'playlist-tags-panel'}>
            {playlistInfo === null || playlistInfo === void 0 ? void 0 : playlistInfo.tags.map((item, index) => (<tdesign_react_1.Tag key={index} theme="primary" variant="light">
                {item}
              </tdesign_react_1.Tag>))}
          </div>
        </div>
      </div>
      <div className={'playlist-list-contain'}>
        {songs.map((item, index) => (<MusicCard_1.default key={item.id} music={item} favor={item.favor} setMusicSource={setMusicSource} playAudio={playAudio}/>))}
      </div>
    </div>);
};
exports.default = Playlist;
//# sourceMappingURL=Playlist.jsx.map