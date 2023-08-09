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
const playlist_svg_1 = __importDefault(require("../assets/svg/playlist.svg"));
const react_router_dom_1 = require("react-router-dom");
require("../style/components/PlaylistCard.scss");
const navbarSlice_1 = require("../store/slices/navbarSlice");
const hooks_1 = require("../store/hooks");
const PlaylistCard = (props) => {
    const { name, plid } = props;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    /** state **/
    const [active, setActive] = (0, react_1.useState)(false);
    /** effect **/
    (0, react_1.useEffect)(() => {
        setActive(id === String(plid));
    }, [id]);
    /** methods **/
    const cardClick = () => {
        dispatch((0, navbarSlice_1.changeActive)(''));
        navigate(`/playlist/${plid}`);
    };
    /** render **/
    return (<div className={`playlist-card ${active ? 'playlist-card-active' : ''}`} onClick={cardClick}>
      <img className={`playlist-card-logo`} src={playlist_svg_1.default} alt="logo"/>
      <div className={`playlist-card-title ${active ? 'playlist-card-title-active' : ''}`}>{name}</div>
    </div>);
};
exports.default = PlaylistCard;
//# sourceMappingURL=PlaylistCard.jsx.map