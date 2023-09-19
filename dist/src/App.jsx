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
const DragBar_1 = __importDefault(require("../src/components/DragBar"));
const react_router_dom_1 = require("react-router-dom");
const router_1 = __importDefault(require("./router"));
require("tdesign-react/dist/reset.css");
require("../src/style/theme.css");
require("./style/global.scss");
function App() {
    // Music element ref
    const audioRef = (0, react_1.useRef)(null);
    /** state **/
    // Music Control
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0); // Current timestamp
    const [volume, setVolume] = (0, react_1.useState)(1); // Volume
    const [src, setSrc] = (0, react_1.useState)('');
    /** effect **/
    (0, react_1.useEffect)(() => {
        const node = window.environmentChannel.node();
        const platform = window.environmentChannel.platform();
        const electron = window.environmentChannel.electron();
        window.logChannel.info(`NODE: v${String(node)}`);
        window.logChannel.info(`PLATFORM: ${String(platform)}`);
        window.logChannel.info(`Chromium: v${String(electron)}`);
    }, []);
    // Reload audio elements
    (0, react_1.useEffect)(() => {
        if (audioRef.current !== null) {
            audioRef.current.oncanplaythrough = () => {
                if (audioRef.current !== null) {
                    audioRef.current.play();
                }
            };
            audioRef.current.load();
        }
        return () => {
            if (audioRef.current !== null) {
                audioRef.current.oncanplaythrough = null;
            }
        };
    }, [src]);
    /** methods **/
    // Play music
    const playAudio = () => {
        if (audioRef.current !== null) {
            audioRef.current.play();
        }
    };
    // Pause music
    const pauseAudio = () => {
        if (audioRef.current !== null) {
            audioRef.current.pause();
        }
    };
    // Get music timestamp
    const handleTimeUpdate = () => {
        if (audioRef.current !== null) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    // Control volume
    const handleVolumeChange = (volume) => {
        if (audioRef.current !== null) {
            audioRef.current.volume = volume;
            setVolume(volume);
        }
    };
    // Set music source
    const setMusicSource = (url) => {
        setSrc(url);
    };
    // Adjust the playback progress
    const adjustPlaybackProgress = (percentage) => {
        if (audioRef.current !== null) {
            const duration = audioRef.current.duration;
            audioRef.current.currentTime = duration * (percentage / 100);
        }
    };
    /** render **/
    return (<>
      <DragBar_1.default />
      <react_router_dom_1.HashRouter>
        <router_1.default currentTime={currentTime} volume={volume} playAudio={playAudio} pauseAudio={pauseAudio} handleVolumeChange={handleVolumeChange} setMusicSource={setMusicSource} adjustPlaybackProgress={adjustPlaybackProgress}/>
      </react_router_dom_1.HashRouter>
      <div style={{ visibility: 'hidden', position: 'absolute' }}>
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} preload={'metadata'}>
          <source src={src}/>
        </audio>
      </div>
    </>);
}
exports.default = App;
//# sourceMappingURL=App.jsx.map