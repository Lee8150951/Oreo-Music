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
const MusicCard_1 = __importDefault(require("../components/MusicCard"));
const favorApi_1 = __importDefault(require("../http/apis/favorApi"));
const utils_1 = __importDefault(require("../util/utils"));
require("../style/views/Favor.scss");
const playlistApi_1 = __importDefault(require("../http/apis/playlistApi"));
const Favor = (props) => {
    /** state **/
    const [songs, setSongs] = (0, react_1.useState)([]);
    const [favorInfo, setFavorInfo] = (0, react_1.useState)();
    /** effect **/
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const uid = utils_1.default.storage.get('om_uid');
            if (uid === null) {
                console.log('还没有登录');
            }
            else {
                const favorRes = (yield favorApi_1.default.getAllFavor(uid));
                const songs = favorRes.tracks;
                // Get favorite playlist and save
                const resFavor = (yield playlistApi_1.default.getFavorPlaylist(uid));
                const favor = resFavor.ids;
                songs.map((item) => {
                    item.favor = favor.includes(item.id);
                    return item;
                });
                setFavorInfo(favorRes);
                setSongs(songs);
            }
        }))();
    }, []);
    /** methods **/
    /** render **/
    return (<div className={'favor-main'}>
      <div className={'favor-header-contain'}>
        <div className={'favor-cover'}>
          <tdesign_react_1.Image className={'favor-cover-img'} src={favorInfo === null || favorInfo === void 0 ? void 0 : favorInfo.coverImgUrl} overlayContent={<></>}/>
        </div>
        <div className={'favor-info'}>
          <h1 className={'favor-info-title'}>{favorInfo === null || favorInfo === void 0 ? void 0 : favorInfo.name}</h1>
          <h4 className={'favor-info-creator'}>
            <span className={'songs-account'}>{favorInfo === null || favorInfo === void 0 ? void 0 : favorInfo.trackCount}首歌</span>
          </h4>
        </div>
      </div>
      <div className={'favor-list-contain'}>
        {songs.map((item, index) => (<MusicCard_1.default key={item.id} music={item} favor={item.favor}/>))}
      </div>
    </div>);
};
exports.default = Favor;
//# sourceMappingURL=Favor.jsx.map