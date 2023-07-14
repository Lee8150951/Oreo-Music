"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const DragBar_1 = __importDefault(require("../src/components/DragBar"));
const react_router_dom_1 = require("react-router-dom");
const router_1 = __importDefault(require("./router"));
// reset css
require("tdesign-react/dist/reset.css");
// tdesign
require("tdesign-react/es/style/index.css");
function App() {
    return (<>
      <DragBar_1.default />
      <react_router_dom_1.HashRouter>
        <router_1.default />
      </react_router_dom_1.HashRouter>
    </>);
}
exports.default = App;
//# sourceMappingURL=App.jsx.map