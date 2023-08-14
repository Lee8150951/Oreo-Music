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
const tdesign_icons_react_1 = require("tdesign-icons-react");
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const LyricsBackground_1 = __importDefault(require("../components/LyricsBackground"));
require("../style/views/Play.scss");
const Play = (props) => {
    /** state **/
    /** effect **/
    (0, react_1.useEffect)(() => {
        console.log(window.environmentChannel.node());
    }, []);
    /** methods **/
    const unfoldHandle = () => {
        pubsub_js_1.default.publish('drawer', false);
    };
    /** render **/
    return (<div className={'play-main'}>
      <LyricsBackground_1.default colors={['red', 'green', 'blue', 'orange']}/>
      <div>1</div>
      <div className={'function-panel'}>
        <span onClick={unfoldHandle}>
          <tdesign_icons_react_1.ChevronDownIcon />
        </span>
      </div>
    </div>);
};
exports.default = Play;
//# sourceMappingURL=Play.jsx.map