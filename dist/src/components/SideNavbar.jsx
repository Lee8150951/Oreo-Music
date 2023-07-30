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
require("../style/components/SideNavbar.scss");
const logo_png_1 = __importDefault(require("../assets/logo.png"));
const NavbarCard_1 = __importDefault(require("./NavbarCard"));
const hooks_1 = require("../store/hooks");
const SideNavbar = (props) => {
    const navbar = (0, hooks_1.useAppSelector)((state) => state.navbar);
    /** state **/
    const [windowHeight, setWindowHeight] = (0, react_1.useState)(window.innerHeight);
    /** effect **/
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    /** methods **/
    /** render **/
    return (<div className={'navbar-contain'} style={{ height: `${windowHeight - 60}px` }}>
      <div className={'navbar-logo-panel'}>
        <img className={'navbar-logo'} src={logo_png_1.default} alt="logo"/>
        <div className={'logo-title'}>
          Oreo&apos;s Music<span style={{ color: '#008AF5' }}>.</span>
        </div>
      </div>
      <div className={'navbar-menu-panel'}>
        {navbar.map((item, index) => {
            return (<NavbarCard_1.default active={item.active} logo={item.logo} logoActive={item.logoActive} title={item.title} path={item.path} key={index}/>);
        })}
      </div>
      <div className={'navbar-playlist-panel'}>
        <div className={'navbar-playlist-title'}>歌单</div>
      </div>
    </div>);
};
exports.default = SideNavbar;
//# sourceMappingURL=SideNavbar.jsx.map