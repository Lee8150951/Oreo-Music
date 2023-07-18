"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../style/components/PlayBar.scss");
const PlayBar = (props) => {
    /** state **/
    /** effect **/
    /** methods **/
    /** render **/
    return (<div className={'play-bar-main'}>
      <div className={'progress-bar-panel'}>
        <div className={'progress-bar played-bar'} style={{ width: `30%` }}></div>
        <div className={'progress-bar'} style={{ width: `70%` }}></div>
      </div>
      <div className={'play-bar-contain'}>
        <img className={'album-cover'} src="https://tdesign.gtimg.com/demo/demo-image-1.png" alt=""/>
      </div>
    </div>);
};
exports.default = PlayBar;
//# sourceMappingURL=PlayBar.jsx.map