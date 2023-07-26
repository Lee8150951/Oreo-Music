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
const homeApi_1 = __importDefault(require("../http/apis/homeApi"));
const RecommendCard_1 = __importDefault(require("../components/RecommendCard"));
require("../style/views/Home.scss");
const Home = (props) => {
    /** state **/
    const [playlist, setPlaylist] = (0, react_1.useState)([]);
    /** effect **/
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const playlistRes = (yield homeApi_1.default.getPlaylist());
            setPlaylist(playlistRes.result);
        }))();
    }, []);
    /** methods **/
    /** render **/
    return (<div className={'home-main'}>
      <div className={'recommend-list-contain'}>
        <div className={'recommend-list-title'}>For you</div>
        <div className={'recommend-list-panel'}>
          {playlist.slice(0, 5).map((item, index) => {
            return (<div key={index} style={{
                    marginLeft: index % 5 === 0 ? '0px' : '15px',
                }}>
                <RecommendCard_1.default picture={item.picUrl} title={item.name}/>
              </div>);
        })}
        </div>
      </div>
      <div className={'other-recommend-contain'}>
        <div className={'daily-recommend-contain'}>
          <div className={'daily-recommend-title'}>每日推荐</div>
        </div>
        <div className={'singer-list-contain'}>
          <div className={'singer-list-title'}>推荐艺人</div>
        </div>
      </div>
      <div className={'album-list-contain'}>
        <div className={'album-list-title'}>新碟上架</div>
      </div>
      <div className={'charts-list-contain'}>
        <div className={'charts-list-title'}>排行榜</div>
      </div>
    </div>);
};
exports.default = Home;
//# sourceMappingURL=Home.jsx.map