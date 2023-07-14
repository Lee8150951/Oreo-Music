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
const routes_1 = __importDefault(require("./routes"));
const Element = (props) => {
    const { component: Component, meta } = props;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const params = (0, react_router_dom_1.useParams)();
    const [usp] = (0, react_router_dom_1.useSearchParams)();
    /** state **/
    /** effect **/
    (0, react_1.useEffect)(() => {
        console.log(meta);
    }, []);
    /** methods **/
    /** render **/
    return (<>
      <Component navigate={navigate} location={location} param={params} usp={usp}></Component>
    </>);
};
function RouterView() {
    return (<div>
      <react_router_dom_1.Routes>
        {routes_1.default.map((item) => {
            const { name, path } = item;
            return <react_router_dom_1.Route key={name} path={path} element={<Element {...item}/>}></react_router_dom_1.Route>;
        })}
      </react_router_dom_1.Routes>
    </div>);
}
exports.default = RouterView;
//# sourceMappingURL=index.jsx.map