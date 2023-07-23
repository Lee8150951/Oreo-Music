"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_1 = __importDefault(require("./App"));
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./store"));
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_redux_1.Provider store={store_1.default}>
    <App_1.default />
  </react_redux_1.Provider>);
//# sourceMappingURL=index.jsx.map