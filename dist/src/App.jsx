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
const DragBar_1 = __importDefault(require("../src/components/DragBar"));
const react_router_dom_1 = require("react-router-dom");
const router_1 = __importDefault(require("./router"));
// reset css
require("tdesign-react/dist/reset.css");
// tdesign theme
require("../src/style/theme.css");
require("./style/global.scss");
function App() {
    (0, react_1.useEffect)(() => {
        const node = window.environmentChannel.node();
        const platform = window.environmentChannel.platform();
        const electron = window.environmentChannel.electron();
        window.logChannel.info(`NODE: v + ${String(node)}`);
        window.logChannel.info(`PLATFORM: ${String(platform)}`);
        window.logChannel.info(`Chromium: v${String(electron)}`);
        (() => __awaiter(this, void 0, void 0, function* () {
            const res = yield window.ipcChannel.getMainColor('www.baidu.com');
            console.log(res);
        }))();
    }, []);
    return (<>
      <DragBar_1.default />
      <react_router_dom_1.HashRouter>
        <router_1.default />
      </react_router_dom_1.HashRouter>
    </>);
}
exports.default = App;
//# sourceMappingURL=App.jsx.map