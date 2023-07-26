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
const tdesign_icons_react_1 = require("tdesign-icons-react");
require("../style/components/RecommendCard.scss");
const RecommendCard = (props) => {
    const { title, picture } = props;
    const mask = (<div className={'card-mask'}>
      <tdesign_icons_react_1.PlayCircleIcon size={'2.5em'}/>
    </div>);
    /** state **/
    const [cardSize, setCardSize] = (0, react_1.useState)((window.innerWidth - 232 - 50 - 20 * 4) / 5);
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
        setCardSize((windowWidth - 232 - 50 - 20 * 4) / 5);
    };
    /** render **/
    return (<div className={'recommend-card'} style={{ width: cardSize }}>
      <div className={'recommend-image-panel'}>
        <tdesign_react_1.Image src={picture} fit="cover" className={'recommend-image'} style={{ width: cardSize, height: cardSize }} overlayContent={mask} overlayTrigger="hover"></tdesign_react_1.Image>
      </div>
      <div className={'recommend-title-panel'}>{title}</div>
    </div>);
};
exports.default = RecommendCard;
//# sourceMappingURL=RecommendCard.jsx.map