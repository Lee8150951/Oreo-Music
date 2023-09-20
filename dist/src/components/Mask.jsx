"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../style/components/Mask.scss");
const tdesign_react_1 = require("tdesign-react");
const Mask = (props) => {
    /** state **/
    /** effect **/
    /** methods **/
    /** render **/
    return (<div className={'skeleton-content'}>
      {new Array(5).fill(0).map((_, index) => (<li className={'skeleton-list-li'} key={index}>
          <tdesign_react_1.Skeleton className={'skeleton-list-avatar'} theme={'avatar'} animation={'flashed'}>
            <></>
          </tdesign_react_1.Skeleton>
          <tdesign_react_1.Skeleton className={'skeleton-list-paragraph'} theme={'paragraph'} animation={'flashed'}>
            <></>
          </tdesign_react_1.Skeleton>
        </li>))}
    </div>);
};
exports.default = Mask;
//# sourceMappingURL=Mask.jsx.map