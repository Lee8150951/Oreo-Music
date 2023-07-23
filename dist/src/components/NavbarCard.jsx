"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../style/components/NavbarCard.scss");
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../store/hooks");
const navbarSlice_1 = require("../store/slices/navbarSlice");
const NavbarCard = (props) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const { title, active, logo, logoActive, path } = props;
    /** state **/
    /** effect **/
    /** methods **/
    const cardClick = () => {
        dispatch((0, navbarSlice_1.changeActive)(path));
        navigate(path);
    };
    /** render **/
    return (<div className={`navbar-card ${active ? 'navbar-card-active' : ''}`} onClick={cardClick}>
      {active ? (<img className={`navbar-card-logo`} src={logoActive} alt=""/>) : (<img className={`navbar-card-logo`} src={logo} alt=""/>)}
      <div className={`navbar-card-title ${active ? 'navbar-card-title-active' : ''}`}>{title}</div>
    </div>);
};
exports.default = NavbarCard;
//# sourceMappingURL=NavbarCard.jsx.map