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
const utils_1 = __importDefault(require("../util/utils"));
const unfavor_svg_1 = __importDefault(require("../assets/svg/unfavor.svg"));
const favor_svg_1 = __importDefault(require("../assets/svg/favor.svg"));
const playlistApi_1 = __importDefault(require("../http/apis/playlistApi"));
const playApi_1 = __importDefault(require("../http/apis/playApi"));
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const event_types_1 = require("../event-types");
const hooks_1 = require("../store/hooks");
const playSlice_1 = require("../store/slices/playSlice");
require("../style/components/MusicCard.scss");
const MusicCard = (props) => {
    const { music, favor, setMusicSource } = props;
    const dispatch = (0, hooks_1.useAppDispatch)();
    /** state **/
    const [isFavor, setIsFavor] = (0, react_1.useState)(favor);
    /** effect **/
    /** methods **/
    const clickHandle = () => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const res = (yield playApi_1.default.getSongUrl(String(music.id), 'exhigh'));
            const songDetail = (yield playApi_1.default.getSongDetail(String(music.id)));
            const songLyric = (yield playApi_1.default.getSongLyric(String(music.id)));
            const { url, type, size } = res.data[0];
            const { dt } = songDetail.songs[0];
            const { lyric } = songLyric.lrc;
            // Public event
            pubsub_js_1.default.publish(event_types_1.PLAY, music.id);
            // Save music info
            const currentSong = {
                id: music.id,
                name: music.name,
                url,
                type,
                lyric,
                // unit: second
                time: Math.floor(dt / 1000),
                size,
                coverImgUrl: music.al.picUrl,
                artists: music.ar,
                album: music.al,
            };
            console.log(currentSong);
            dispatch((0, playSlice_1.changePlay)(currentSong));
            setMusicSource === null || setMusicSource === void 0 ? void 0 : setMusicSource(url);
        }))();
    };
    const favorClick = () => {
        try {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                setIsFavor(!isFavor);
                yield playlistApi_1.default.addFavorMusic(music.id, !isFavor);
            }))();
        }
        catch (_) {
            tdesign_react_1.MessagePlugin.warning('喜欢失败', 3 * 1000);
        }
    };
    /** render **/
    return (<div onDoubleClick={clickHandle}>
      <tdesign_react_1.Row className={'music-card-main'}>
        <tdesign_react_1.Col span={3} className={'music-card-header'}>
          <div className={'album-cover'}>
            <tdesign_react_1.Image className={'album-cover-img'} src={music.al.picUrl} fit="cover" shape="round"/>
          </div>
          <div className={'music-info-panel'}>
            <span className={'music-name'}>{music.name}</span>
            <br />
            <span className={'music-album'}>{music.al.name}</span>
          </div>
        </tdesign_react_1.Col>
        <tdesign_react_1.Col span={6} className={'music-card-middle'}>
          {music.ar.slice(0, 2).map((item, index) => {
            if (music.ar.length !== 1 && index !== 1) {
                return (<span key={index} className={'music-artist'}>
                  {item.name},&nbsp;
                </span>);
            }
            else {
                return (<span key={index} className={'music-artist'}>
                  {item.name}
                </span>);
            }
        })}
        </tdesign_react_1.Col>
        <tdesign_react_1.Col span={3} className={'music-card-tail'}>
          <div className={'favor-contain'} onClick={favorClick}>
            {isFavor ? (<tdesign_react_1.Image src={favor_svg_1.default} className={'favor-icon'}/>) : (<tdesign_react_1.Image src={unfavor_svg_1.default} className={'favor-icon'}/>)}
          </div>
          <div className={'music-dt'}>{utils_1.default.formatMillisecondsToMinutesSeconds(music.dt)}</div>
        </tdesign_react_1.Col>
      </tdesign_react_1.Row>
    </div>);
};
exports.default = MusicCard;
//# sourceMappingURL=MusicCard.jsx.map