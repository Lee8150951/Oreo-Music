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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const tdesign_react_1 = require("tdesign-react");
const voice_png_1 = __importDefault(require("../assets/icon/voice.png"));
const like_png_1 = __importDefault(require("../assets/icon/like.png"));
const spread_svg_1 = __importDefault(require("../assets/svg/spread.svg"));
const previous_svg_1 = __importDefault(require("../assets/svg/previous.svg"));
const next_svg_1 = __importDefault(require("../assets/svg/next.svg"));
const circle_svg_1 = __importDefault(require("../assets/svg/circle.svg"));
const random_svg_1 = __importDefault(require("../assets/svg/random.svg"));
const play_svg_1 = __importDefault(require("../assets/svg/play.svg"));
const pause_svg_1 = __importDefault(require("../assets/svg/pause.svg"));
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const event_types_1 = require("../event-types");
const hooks_1 = require("../store/hooks");
require("../style/components/PlayBar.scss");
const PlayBar = (props) => {
    const { playAudio, pauseAudio, currentTime } = props;
    const _playSong = (0, hooks_1.useAppSelector)((state) => state.play);
    /** state **/
    const [playSong, setPlaySong] = (0, react_1.useState)();
    const [playProgress, setPlayProgress] = (0, react_1.useState)(0);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(true);
    /** effect **/
    (0, react_1.useEffect)(() => {
        setPlaySong(_playSong);
    }, [_playSong]);
    (0, react_1.useEffect)(() => {
        if (currentTime !== undefined) {
            const progress = (currentTime / _playSong.time) * 100;
            setPlayProgress(progress);
        }
    }, [currentTime]);
    /** methods **/
    const spreadDrawer = () => {
        pubsub_js_1.default.publish(event_types_1.DRAWER, true);
    };
    const previousClick = () => {
        // TODO: previous music
    };
    const playClick = () => {
        setIsPlaying(true);
        playAudio === null || playAudio === void 0 ? void 0 : playAudio();
    };
    const pauseClick = () => {
        setIsPlaying(false);
        pauseAudio === null || pauseAudio === void 0 ? void 0 : pauseAudio();
    };
    const nextClick = () => {
        // TODO: next music
    };
    /** render **/
    return (<div className={'play-bar-main'}>
      <div className={'progress-bar-panel'}>
        <tdesign_react_1.Slider label={false} value={playProgress}></tdesign_react_1.Slider>
      </div>
      <tdesign_react_1.Row className={'play-bar-contain'}>
        <tdesign_react_1.Col className={'play-info'} span={5}>
          <div className={'album-cover-panel'} onClick={spreadDrawer}>
            <img className={'album-cover'} src={playSong === null || playSong === void 0 ? void 0 : playSong.coverImgUrl} alt="album"/>
            <div className={'album-cover-mask'}>
              <tdesign_react_1.Image className={'spread-icon'} src={spread_svg_1.default} overlayContent={<></>}/>
            </div>
          </div>
          <div className={'album-title'}>{playSong === null || playSong === void 0 ? void 0 : playSong.name}</div>
          <div className={'album-author'}>
            <span>{playSong === null || playSong === void 0 ? void 0 : playSong.artists[0].name}</span>
          </div>
        </tdesign_react_1.Col>
        <tdesign_react_1.Col className={'control-btn'} span={2}>
          <div className={'random-icon-panel'}>
            <tdesign_react_1.Image src={random_svg_1.default} className={'other-icon'} overlayContent={<></>}/>
          </div>
          <div className={'previous-icon-panel'} onClick={previousClick}>
            <tdesign_react_1.Image src={previous_svg_1.default} className={'func-icon'} overlayContent={<></>}/>
          </div>
          {!isPlaying ? (<div className={'play-icon-panel'} onClick={playClick}>
              <tdesign_react_1.Image src={play_svg_1.default} className={'play-icon'} overlayContent={<></>}/>
            </div>) : (<div className={'pause-icon-panel'} onClick={pauseClick}>
              <tdesign_react_1.Image src={pause_svg_1.default} className={'pause-icon'} overlayContent={<></>}/>
            </div>)}
          <div className={'next-icon-panel'} onClick={nextClick}>
            <tdesign_react_1.Image src={next_svg_1.default} className={'func-icon'} overlayContent={<></>}/>
          </div>
          <div className={'single-icon-panel'}>
            <tdesign_react_1.Image src={circle_svg_1.default} className={'other-icon'} overlayContent={<></>}/>
          </div>
        </tdesign_react_1.Col>
        <tdesign_react_1.Col className={'other-btn'} span={5}>
          <div className={'like-icon-panel'}>
            <img className={'like-icon'} src={like_png_1.default} alt="next"/>
          </div>
          <div className={'voice-icon-panel'}>
            <img className={'voice-icon'} src={voice_png_1.default} alt="next"/>
          </div>
          <div className={'voice-slider'}>
            <tdesign_react_1.Slider label={false}></tdesign_react_1.Slider>
          </div>
        </tdesign_react_1.Col>
      </tdesign_react_1.Row>
    </div>);
};
exports.default = PlayBar;
//# sourceMappingURL=PlayBar.jsx.map