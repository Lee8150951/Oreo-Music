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
const DragBar_1 = __importDefault(require("../src/components/DragBar"));
const react_router_dom_1 = require("react-router-dom");
const router_1 = __importDefault(require("./router"));
require("tdesign-react/dist/reset.css");
require("../src/style/theme.css");
require("./style/global.scss");
const hooks_1 = require("./store/hooks");
const playlistSlice_1 = require("./store/slices/playlistSlice");
const utils_1 = __importDefault(require("./util/utils"));
const playApi_1 = __importDefault(require("./http/apis/playApi"));
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const event_types_1 = require("./event-types");
const playSlice_1 = require("./store/slices/playSlice");
function App() {
    const playlist = (0, hooks_1.useAppSelector)((state) => state.playlist);
    const dispatch = (0, hooks_1.useAppDispatch)();
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
    // Play according to the playlist
    (0, react_1.useEffect)(() => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const music = playlist[0];
            const res = (yield playApi_1.default.getSongUrl(String(music.sid), 'exhigh'));
            const songDetail = (yield playApi_1.default.getSongDetail(String(music.sid)));
            const songLyric = (yield playApi_1.default.getSongLyric(String(music.sid)));
            const { url, type, size } = res.data[0];
            const { dt } = songDetail.songs[0];
            const { lyric } = songLyric.lrc;
            // Public event
            pubsub_js_1.default.publish(event_types_1.PLAY, music.sid);
            // Save music info
            const currentSong = {
                id: parseInt(music.sid),
                name: music.name,
                url,
                type,
                lyric,
                // unit: second
                time: Math.floor(dt / 1000),
                size,
                coverImgUrl: songDetail.songs[0].al.picUrl,
                artists: songDetail.songs[0].ar,
                album: songDetail.songs[0].al,
            };
            dispatch((0, playSlice_1.changePlay)(currentSong));
            setMusicSource(url);
        }))();
    }, [playlist]);
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
    // When the music is finished
    const handleOnEnded = () => {
        const bacPlaylist = utils_1.default.deepClone(playlist);
        bacPlaylist.shift();
        dispatch((0, playlistSlice_1.changePlaylist)(bacPlaylist));
    };
    // Triggered when there is a playback error
    const handleOnError = () => {
        console.log('Play Error');
    };
    /** render **/
    return (<>
      <DragBar_1.default />
      <react_router_dom_1.HashRouter>
        <router_1.default currentTime={currentTime} volume={volume} playAudio={playAudio} pauseAudio={pauseAudio} handleVolumeChange={handleVolumeChange} setMusicSource={setMusicSource} adjustPlaybackProgress={adjustPlaybackProgress}/>
      </react_router_dom_1.HashRouter>
      <div style={{ visibility: 'hidden', position: 'absolute' }}>
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleOnEnded} onError={handleOnError} preload={'metadata'}>
          <source src={src}/>
        </audio>
      </div>
    </>);
}
exports.default = App;
//# sourceMappingURL=App.jsx.map