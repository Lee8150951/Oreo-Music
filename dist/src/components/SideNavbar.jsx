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
require("../style/components/SideNavbar.scss");
const SideNavbar = (props) => {
    const { MenuItem } = tdesign_react_1.Menu;
    const Logo = () => <img width="136" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo"/>;
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
    return (<tdesign_react_1.Menu style={{ width: '100%', height: `${windowHeight - 60}px`, boxShadow: 'none' }} logo={<Logo />} {...props}>
      <MenuItem value="1">侧边内容一</MenuItem>
      <MenuItem value="2">侧边内容二</MenuItem>
      <MenuItem value="3">侧边内容三</MenuItem>
      <MenuItem value="4">侧边内容四</MenuItem>
      <MenuItem value="5">侧边内容无</MenuItem>
    </tdesign_react_1.Menu>);
};
exports.default = SideNavbar;
//# sourceMappingURL=SideNavbar.jsx.map