"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const tdesign_icons_react_1 = require("tdesign-icons-react");
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const LyricsBackground_1 = __importDefault(require("../components/LyricsBackground"));
require("../style/views/Play.scss");
const Play = (props) => {
    /** state **/
    /** effect **/
    /** methods **/
    const unfoldHandle = () => {
        pubsub_js_1.default.publish('drawer', false);
    };
    /** render **/
    return (<div className={'play-main'}>
      <LyricsBackground_1.default colors={['red', 'green', 'blue', 'orange']}/>
      <div className={'function-panel'}>
        <span onClick={unfoldHandle}>
          <tdesign_icons_react_1.ChevronDownIcon />
        </span>
      </div>
    </div>);
};
exports.default = Play;
//# sourceMappingURL=Play.jsx.map