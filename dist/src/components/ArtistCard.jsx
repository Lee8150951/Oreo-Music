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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const tdesign_react_1 = require("tdesign-react");
require("../style/components/ArtistCard.scss");
const ArtistCard = (props) => {
    const { url, name } = props;
    /** state **/
    const [cardSize, setCardSize] = (0, react_1.useState)(((window.innerWidth - 232 - 60) / 2 - 10 - 10 * 3) / 4);
    /** effect **/
    (0, react_1.useEffect)(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    /** methods **/
    const handleResize = () => {
        const windowWidth = window.innerWidth;
        setCardSize(((windowWidth - 232 - 60) / 2 - 10 - 10 * 3) / 4);
    };
    /** render **/
    return (<div className={'artist-panel'}>
      <tdesign_react_1.Image src={url} shape="circle" style={{ width: cardSize, height: cardSize }}/>
      <div className={'artist-name'}>{name}</div>
    </div>);
};
exports.default = ArtistCard;
//# sourceMappingURL=ArtistCard.jsx.map