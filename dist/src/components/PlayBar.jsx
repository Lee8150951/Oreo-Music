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
const play_png_1 = __importDefault(require("../assets/icon/play.png"));
const previous_png_1 = __importDefault(require("../assets/icon/previous.png"));
const next_png_1 = __importDefault(require("../assets/icon/next.png"));
const random_png_1 = __importDefault(require("../assets/icon/random.png"));
const single_png_1 = __importDefault(require("../assets/icon/single.png"));
const voice_png_1 = __importDefault(require("../assets/icon/voice.png"));
const like_png_1 = __importDefault(require("../assets/icon/like.png"));
const spread_svg_1 = __importDefault(require("../assets/svg/spread.svg"));
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const event_types_1 = require("../event-types");
const hooks_1 = require("../store/hooks");
require("../style/components/PlayBar.scss");
const PlayBar = (props) => {
    const _playSong = (0, hooks_1.useAppSelector)((state) => state.play);
    /** state **/
    const [playSong, setPlaySong] = (0, react_1.useState)();
    /** effect **/
    (0, react_1.useEffect)(() => {
        setPlaySong(_playSong);
    }, [_playSong]);
    /** methods **/
    const spreadDrawer = () => {
        pubsub_js_1.default.publish(event_types_1.DRAWER, true);
    };
    /** render **/
    return (<div className={'play-bar-main'}>
      <div className={'progress-bar-panel'}>
        <div className={'progress-bar played-bar'} style={{ width: `30%` }}></div>
        <div className={'progress-bar'} style={{ width: `70%` }}></div>
      </div>
      <tdesign_react_1.Row className={'play-bar-contain'}>
        <tdesign_react_1.Col className={'play-info'} span={5}>
          <div className={'album-cover-panel'} onClick={spreadDrawer}>
            <img className={'album-cover'} src={playSong === null || playSong === void 0 ? void 0 : playSong.coverImgUrl} alt="album"/>
            <div className={'album-cover-mask'}>
              <tdesign_react_1.Image className={'spread-icon'} src={spread_svg_1.default}></tdesign_react_1.Image>
            </div>
          </div>
          <div className={'album-title'}>{playSong === null || playSong === void 0 ? void 0 : playSong.name}</div>
          <div className={'album-author'}>
            <span>{playSong === null || playSong === void 0 ? void 0 : playSong.artists[0].name}</span>
          </div>
        </tdesign_react_1.Col>
        <tdesign_react_1.Col className={'control-btn'} span={2}>
          <div className={'random-icon-panel'}>
            <img className={'func-icon'} src={random_png_1.default} alt="previous"/>
          </div>
          <div className={'previous-icon-panel'}>
            <img className={'func-icon'} src={previous_png_1.default} alt="previous"/>
          </div>
          <div className={'play-icon-panel'}>
            <img className={'play-icon'} src={play_png_1.default} alt="play"/>
          </div>
          <div className={'next-icon-panel'}>
            <img className={'func-icon'} src={next_png_1.default} alt="next"/>
          </div>
          <div className={'single-icon-panel'}>
            <img className={'func-icon'} src={single_png_1.default} alt="next"/>
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