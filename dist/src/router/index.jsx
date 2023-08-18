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
const react_router_dom_1 = require("react-router-dom");
const Frame_1 = __importDefault(require("../components/Frame"));
const Mask_1 = __importDefault(require("../components/Mask"));
const routes_1 = __importDefault(require("./routes"));
const Element = (props) => {
    const { component: Component, currentTime, handleVolumeChange, volume, playAudio, pauseAudio } = props;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const params = (0, react_router_dom_1.useParams)();
    const [usp] = (0, react_router_dom_1.useSearchParams)();
    /** state **/
    const [meta, setMeta] = (0, react_1.useState)({ extra: false });
    /** effect **/
    (0, react_1.useEffect)(() => {
        if (props.meta != null) {
            setMeta(props.meta);
        }
        else {
            setMeta({ extra: false });
        }
    }, [props, location]);
    /** methods **/
    /** render **/
    return (<>
      {meta.extra ? (<Component navigate={navigate} location={location} param={params} usp={usp}/>) : (<Frame_1.default>
          <Component currentTime={currentTime} volume={volume} playAudio={playAudio} pauseAudio={pauseAudio} handleVolumeChange={handleVolumeChange} navigate={navigate} location={location} param={params} usp={usp}/>
        </Frame_1.default>)}
    </>);
};
function RouterView(props) {
    /** render **/
    return (<react_1.Suspense fallback={<Mask_1.default />}>
      <react_router_dom_1.Routes>
        {routes_1.default.map((item) => {
            const { name, path } = item;
            return <react_router_dom_1.Route key={name} path={path} element={<Element {...props} {...item}/>}></react_router_dom_1.Route>;
        })}
      </react_router_dom_1.Routes>
    </react_1.Suspense>);
}
exports.default = RouterView;
//# sourceMappingURL=index.jsx.map