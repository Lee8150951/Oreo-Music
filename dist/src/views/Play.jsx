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
const previous_playView_svg_1 = __importDefault(require("../assets/svg/previous-playView.svg"));
const play_playView_svg_1 = __importDefault(require("../assets/svg/play-playView.svg"));
const next_playView_svg_1 = __importDefault(require("../assets/svg/next-playView.svg"));
const pause_playView_svg_1 = __importDefault(require("../assets/svg/pause-playView.svg"));
require("../style/views/Play.scss");
const Play = (props) => {
    const { playAudio, pauseAudio, currentTime } = props;
    const play = (0, hooks_1.useAppSelector)((state) => state.play);
    const playRef = (0, react_1.useRef)(null);
    const activeSpanRef = (0, react_1.useRef)(null);
    const lyricRef = (0, react_1.useRef)(null);
    /** state **/
    const [colorList, setColorList] = (0, react_1.useState)([]);
    const [isLoad, setIsLoad] = (0, react_1.useState)(false);
    const [playCover, setPlayCover] = (0, react_1.useState)('');
    const [playSong, setPlaySong] = (0, react_1.useState)();
    const [playLyric, setPlayLyric] = (0, react_1.useState)('');
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(true);
    const [playProgress, setPlayProgress] = (0, react_1.useState)(0);
    const [lyric, setLyric] = (0, react_1.useState)([]);
    const [currentLyric, setCurrentLyric] = (0, react_1.useState)(0);
    const [scrollHeight, setScrollHeight] = (0, react_1.useState)(10);
    /** effect **/
    (0, react_1.useEffect)(() => {
        setIsLoad(false);
        const containerElement = lyricRef.current;
        if (containerElement !== null) {
            containerElement.scrollTop = 10;
        }
        const playEvent = pubsub_js_1.default.subscribe(event_types_1.PLAY, (_, data) => {
            setPlayCover(play.coverImgUrl);
            setScrollHeight(10);
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
        const containerElement = lyricRef.current;
        if (containerElement !== null) {
            containerElement.scrollTop = 10;
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield window.ipcChannel.getMainColor(play.coverImgUrl);
            setPlayCover(play.coverImgUrl);
            setPlaySong(play);
            if (play.lyric !== undefined) {
                setPlayLyric(play.lyric);
            }
            setScrollHeight(10);
            setColorList(res);
            setIsPlaying(true);
            setIsLoad(true);
        }))();
    }, [playCover]);
    (0, react_1.useEffect)(() => {
        if (currentTime !== undefined) {
            // Progress bar
            const progress = (currentTime / play.time) * 100;
            setPlayProgress(progress);
            // Lyric display
            const currentMicroTime = Math.floor(currentTime * 1000);
            const index = lyric.findIndex((item) => {
                return item.time >= currentMicroTime;
            });
            setCurrentLyric(index - 1);
        }
    }, [currentTime]);
    (0, react_1.useEffect)(() => {
        const lyrArr = playLyric.split('}');
        const lyr = lyrArr[lyrArr.length - 1].split('\n');
        lyr.shift();
        const newLyric = [];
        lyr.forEach((value) => {
            const time = String(value.split(']')[0].split('[')[1]);
            if (time !== undefined && time !== 'undefined') {
                const minute = time.split(':')[0];
                const second = time.split(':')[1].split('.')[0];
                const micro = time.split('.')[1];
                const number = parseInt(minute) * 60 * 1000 + parseInt(second) * 1000 + parseInt(micro);
                const str = value.split(']')[1];
                if (str !== '') {
                    newLyric.push({ time: number, str });
                }
            }
        });
        newLyric.unshift({ time: 0, str: '. . .' });
        setLyric(newLyric);
    }, [playLyric]);
    // Lyrics offset
    (0, react_1.useEffect)(() => {
        const containerElement = lyricRef.current;
        const activeElement = activeSpanRef.current;
        if (containerElement !== null && activeElement !== null) {
            const activeElementHeight = activeElement.offsetHeight;
            containerElement.scrollTop = scrollHeight + activeElementHeight + 37;
            setScrollHeight(scrollHeight + activeElementHeight + 37);
        }
    }, [currentLyric]);
    /** methods **/
    const unfoldHandle = () => {
        pubsub_js_1.default.publish(event_types_1.DRAWER, false);
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
        <tdesign_react_1.Col span={6} className={'play-cover-contain'} ref={playRef}>
          <tdesign_react_1.Image src={playCover} className={'play-cover'} fit={'cover'}/>
          <div className={'play-song-name'}>{playSong === null || playSong === void 0 ? void 0 : playSong.name}</div>
          <div className={'play-artist-name'}>{playSong === null || playSong === void 0 ? void 0 : playSong.artists[0].name}</div>
          <div className={'play-progress-bar'}>
            <tdesign_react_1.Slider label={false} value={playProgress}></tdesign_react_1.Slider>
          </div>
          <div className={'play-function-panel'}>
            <div className={'previous-panel'} onClick={previousClick}>
              <tdesign_react_1.Image src={previous_playView_svg_1.default} className={'func-icon'} overlayContent={<></>}/>
            </div>
            {!isPlaying ? (<div className={'play-panel'} onClick={playClick}>
                <tdesign_react_1.Image src={play_playView_svg_1.default} className={'func-icon'} overlayContent={<></>}/>
              </div>) : (<div className={'pause-panel'} onClick={pauseClick}>
                <tdesign_react_1.Image src={pause_playView_svg_1.default} className={'func-icon'} overlayContent={<></>}/>
              </div>)}
            <div className={'next-panel'} onClick={nextClick}>
              <tdesign_react_1.Image src={next_playView_svg_1.default} className={'func-icon'} overlayContent={<></>}/>
            </div>
          </div>
        </tdesign_react_1.Col>
        <tdesign_react_1.Col span={6} className={'play-lyric-main'}>
          <div ref={lyricRef} className={'play-lyrics-contain'}>
            <div className={'lyric-top-mask'}></div>
            <div>
              {lyric.map((value, index) => (<div className={'play-lyric-panel'} key={index}>
                  <span className={index === currentLyric ? 'current-play' : 'not-play'} ref={index === currentLyric ? activeSpanRef : null}>
                    {value.str}
                  </span>
                </div>))}
            </div>
          </div>
        </tdesign_react_1.Col>
      </tdesign_react_1.Row>
    </div>);
};
exports.default = Play;
//# sourceMappingURL=Play.jsx.map