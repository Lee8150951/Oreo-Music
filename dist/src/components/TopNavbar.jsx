"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const tdesign_react_1 = require("tdesign-react");
const tdesign_icons_react_1 = require("tdesign-icons-react");
require("../style/components/TopNavbar.scss");
const react_router_dom_1 = require("react-router-dom");
const TopNavbar = (props) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const options = [
        {
            content: '设置',
            value: '/setting',
            prefixIcon: <tdesign_icons_react_1.SettingIcon />,
            divider: true,
        },
        {
            content: '登录',
            value: '/login',
            prefixIcon: <tdesign_icons_react_1.LoginIcon />,
        },
    ];
    /** state **/
    /** effect **/
    /** methods **/
    const clickHandler = (data) => {
        navigate(data.value);
    };
    /** render **/
    return (<div className={'top-navbar-main'}>
      <div className={'search-bar'}>
        <tdesign_react_1.Input prefixIcon={<tdesign_icons_react_1.SearchIcon />} placeholder="搜索" align="left" size="medium" status="default" type="text"/>
      </div>
      <div className={'user-bar'}>
        <div className={'user-name'}>Ethan</div>
        <div className={'user-avatar'}>
          <tdesign_react_1.Dropdown options={options} onClick={clickHandler} trigger="click">
            <div className={'drop-list'}>
              <tdesign_react_1.Avatar image="https://oreo-image-bed-1310232028.cos.ap-shanghai.myqcloud.com/image/v2-b45cee193b6ed9667e03a389fbcb0891_b.jpg" shape="circle"/>
              <tdesign_icons_react_1.Icon className={'down-icon'} name="chevron-down" size="16"/>
            </div>
          </tdesign_react_1.Dropdown>
        </div>
      </div>
    </div>);
};
exports.default = TopNavbar;
//# sourceMappingURL=TopNavbar.jsx.map