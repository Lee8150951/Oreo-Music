"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const reducer_1 = __importDefault(require("./reducer"));
const store = (0, toolkit_1.configureStore)({
    reducer: reducer_1.default,
});
exports.default = store;
//# sourceMappingURL=index.js.map