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
const tdesign_icons_react_1 = require("tdesign-icons-react");
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const LyricsBackground_1 = __importDefault(require("../components/LyricsBackground"));
const event_types_1 = require("../event-types");
const hooks_1 = require("../store/hooks");
const tdesign_react_1 = require("tdesign-react");
require("../style/views/Play.scss");
const Play = (props) => {
    const play = (0, hooks_1.useAppSelector)((state) => state.play);
    /** state **/
    const [colorList, setColorList] = (0, react_1.useState)([]);
    const [isLoad, setIsLoad] = (0, react_1.useState)(false);
    const [playCover, setPlayCover] = (0, react_1.useState)('');
    const [playSong, setPlaySong] = (0, react_1.useState)();
    /** effect **/
    (0, react_1.useEffect)(() => {
        setIsLoad(false);
        const playEvent = pubsub_js_1.default.subscribe(event_types_1.PLAY, (_, data) => {
            setPlayCover(play.coverImgUrl);
            setPlaySong(play);
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield window.ipcChannel.getMainColor(play.coverImgUrl);
                setColorList(res);
                window.logChannel.info(String(res));
                setIsLoad(true);
            }))();
        });
        return () => {
            pubsub_js_1.default.unsubscribe(playEvent);
        };
    }, [play]);
    (0, react_1.useEffect)(() => {
        setIsLoad(false);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield window.ipcChannel.getMainColor(play.coverImgUrl);
            setColorList(res);
            setIsLoad(true);
        }))();
    }, [playCover]);
    /** methods **/
    const unfoldHandle = () => {
        pubsub_js_1.default.publish(event_types_1.DRAWER, false);
    };
    /** render **/
    if (!isLoad) {
        return <div></div>;
    }
    return (<div className={'play-main'}>
      <LyricsBackground_1.default colors={colorList}/>
      <div className={'function-panel'}>
        <span onClick={unfoldHandle}>
          <tdesign_icons_react_1.ChevronDownIcon />
        </span>
      </div>
      <tdesign_react_1.Row className={'play-contain'}>
        <tdesign_react_1.Col span={6} className={'play-cover-contain'}>
          <tdesign_react_1.Image src={playCover} className={'play-cover'} fit={'cover'}/>
          <div className={'play-song-name'}>{playSong === null || playSong === void 0 ? void 0 : playSong.name}</div>
          <div className={'play-artist-name'}>{playSong === null || playSong === void 0 ? void 0 : playSong.artists[0].name}</div>
        </tdesign_react_1.Col>
        <tdesign_react_1.Col span={6} className={'play-lyrics-contain'}></tdesign_react_1.Col>
      </tdesign_react_1.Row>
    </div>);
};
exports.default = Play;
//# sourceMappingURL=Play.jsx.map