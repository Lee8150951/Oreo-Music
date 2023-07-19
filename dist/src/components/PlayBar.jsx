"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const tdesign_react_1 = require("tdesign-react");
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
      <tdesign_react_1.Row className={'play-bar-contain'}>
        <tdesign_react_1.Col className={'play-info'} span={5}>
          <img className={'album-cover'} src="https://tdesign.gtimg.com/demo/demo-image-1.png" alt=""/>
        </tdesign_react_1.Col>
        <tdesign_react_1.Col className={'control-btn'} span={2}>
          1
        </tdesign_react_1.Col>
        <tdesign_react_1.Col className={'other-btn'} span={5}>
          1
        </tdesign_react_1.Col>
      </tdesign_react_1.Row>
    </div>);
};
exports.default = PlayBar;
//# sourceMappingURL=PlayBar.jsx.map