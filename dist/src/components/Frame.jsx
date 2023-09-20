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
const TopNavbar_1 = __importDefault(require("./TopNavbar"));
const SideNavbar_1 = __importDefault(require("./SideNavbar"));
const PlayBar_1 = __importDefault(require("./PlayBar"));
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const Play_1 = __importDefault(require("../views/Play"));
const event_types_1 = require("../event-types");
const hooks_1 = require("../store/hooks");
require("../style/components/Frame.scss");
const Frame = (props) => {
    const { children, currentTime, playAudio, pauseAudio, handleVolumeChange, volume, adjustPlaybackProgress } = props;
    const { Content, Aside } = tdesign_react_1.Layout;
    const play = (0, hooks_1.useAppSelector)((state) => state.play);
    /** state **/
    const [isSpread, setIsSpread] = (0, react_1.useState)(false);
    const [marginTop, setMarginTop] = (0, react_1.useState)(window.innerHeight * 1.5);
    const [playSong, setPlaySong] = (0, react_1.useState)();
    /** effect **/
    // Subscribe to the global drawer event
    (0, react_1.useEffect)(() => {
        const drawer = pubsub_js_1.default.subscribe(event_types_1.DRAWER, (_, data) => {
            setIsSpread(data);
            if (data) {
                setMarginTop(0);
            }
            else {
                setMarginTop(window.innerHeight * 1.5);
            }
        });
        return () => {
            pubsub_js_1.default.unsubscribe(drawer);
        };
    }, []);
    // Process window resize action
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            if (!isSpread) {
                setMarginTop(window.innerHeight * 1.5);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        setPlaySong(play);
    }, [play]);
    /** methods **/
    /** render **/
    return (<div className={'frame'}>
      <tdesign_react_1.Layout>
        <Aside className={'aside'}>
          <SideNavbar_1.default></SideNavbar_1.default>
        </Aside>
        <tdesign_react_1.Layout className={'layout'}>
          <Content>
            <div className={'header'}>
              <TopNavbar_1.default />
            </div>
            <div className={'content'}>{children}</div>
          </Content>
        </tdesign_react_1.Layout>
      </tdesign_react_1.Layout>
      {(playSong === null || playSong === void 0 ? void 0 : playSong.id) === -1 ? (<></>) : (<div className={'footer'}>
          <PlayBar_1.default currentTime={currentTime} volume={volume} playAudio={playAudio} pauseAudio={pauseAudio} handleVolumeChange={handleVolumeChange} adjustPlaybackProgress={adjustPlaybackProgress}/>
          <div className={'drawer'} style={{ top: marginTop }}>
            <Play_1.default currentTime={currentTime} volume={volume} playAudio={playAudio} pauseAudio={pauseAudio} handleVolumeChange={handleVolumeChange} adjustPlaybackProgress={adjustPlaybackProgress}/>
          </div>
        </div>)}
    </div>);
};
exports.default = Frame;
//# sourceMappingURL=Frame.jsx.map