"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
require("../style/components/PlayBar.scss");
const PlayBar = (props) => {
    /** state **/
    /** effect **/
    /** methods **/
    const spreadDrawer = () => {
        pubsub_js_1.default.publish('drawer', true);
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
            <img className={'album-cover'} src="https://tdesign.gtimg.com/demo/demo-image-1.png" alt="album"/>
            <div className={'album-cover-mask'}>
              <tdesign_react_1.Image className={'spread-icon'} src={spread_svg_1.default}></tdesign_react_1.Image>
            </div>
          </div>
          <div className={'album-title'}>City of Star</div>
          <div className={'album-author'}>
            <span>Ryan Gosling</span>
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