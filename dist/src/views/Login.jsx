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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const tdesign_react_1 = require("tdesign-react");
const loginApi_1 = __importDefault(require("../http/apis/loginApi"));
const userApi_1 = __importDefault(require("../http/apis/userApi"));
const tdesign_icons_react_1 = require("tdesign-icons-react");
const utils_1 = __importDefault(require("../util/utils"));
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../store/hooks");
const userSlice_1 = require("../store/slices/userSlice");
const login_bg_png_1 = __importDefault(require("../assets/image/background/login-bg.png"));
const logo_png_1 = __importDefault(require("../assets/logo.png"));
require("../style/views/Login.scss");
const Login = (props) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    /** state **/
    const [windowHeight, setWindowHeight] = (0, react_1.useState)(window.innerHeight);
    const [qrImg, setQrImg] = (0, react_1.useState)('');
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
    // Initialize QR code
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const [qrImgRes, qrKey] = yield loginApi_1.default.getLoginCode();
            setQrImg(qrImgRes);
            const timer = setInterval(() => {
                (() => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        const statusRes = (yield loginApi_1.default.getCheckStatus(qrKey));
                        const code = statusRes.code;
                        if (code === 800) {
                            // Time out/
                            const qrImgRes = (yield loginApi_1.default.getLoginCode())[0];
                            setQrImg(qrImgRes);
                        }
                        else if (code === 803) {
                            // Successfully logged in
                            clearInterval(timer);
                            const cookie = statusRes.cookie;
                            // Save token
                            utils_1.default.storage.set('om_tk', cookie);
                            // Save profile to redux
                            const userInfo = (yield userApi_1.default.getUserStatus(cookie));
                            // Save uid
                            utils_1.default.storage.set('om_uid', userInfo.data.profile.userId);
                            dispatch((0, userSlice_1.saveUser)(userInfo.profile));
                            navigate('/');
                        }
                    }
                    catch (_) { }
                }))();
            }, 3000);
        }))();
    }, []);
    /** methods **/
    const backClick = () => {
        navigate('/');
    };
    /** render **/
    return (<div className={'login-page-main'}>
      <div className={'login-form-contain'}>
        <div className={'login-logo-panel'}>
          <img className={'login-logo'} src={logo_png_1.default} alt="logo"/>
          <div className={'logo-title'}>
            Oreo&apos;s Music<span style={{ color: '#008AF5' }}>.</span>
          </div>
        </div>
        <div className={'qr-code-contain'}>
          <div className={'qr-code-top-title'}>SCAN THE CODE TO LOG IN</div>
          <div className={'qr-code-title'}>
            请扫码登录
            <span style={{ color: '#008AF5', fontSize: '50px', lineHeight: '20px', marginLeft: '5px' }}>.</span>
          </div>
          <div className={'qr-panel-border'}>
            <div className={'qr-panel'}>
              <img className={'qr-img'} src={qrImg} alt="QR"/>
            </div>
          </div>
          <div className={'back-page'}>
            <div>
              <tdesign_icons_react_1.ChevronRightIcon size="2em"/>
            </div>
            <div className={'back-title'}>.&nbsp;&nbsp;使用游客身份的使用？</div>
            <div className={'back-btn'} onClick={backClick}>
              返回
            </div>
          </div>
        </div>
      </div>
      <div className={'login-bg'}>
        <tdesign_react_1.Image src={login_bg_png_1.default} fit="cover" overlayContent={<div></div>} style={{
            height: windowHeight,
            backgroundColor: '#FFFFFF',
        }}/>
      </div>
    </div>);
};
exports.default = Login;
//# sourceMappingURL=Login.jsx.map