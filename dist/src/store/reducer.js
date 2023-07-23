"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const navbarSlice_1 = __importDefault(require("./slices/navbarSlice"));
const reducers = {
    navbar: navbarSlice_1.default,
};
const rootReducer = (0, toolkit_1.combineReducers)(reducers);
exports.default = rootReducer;
//# sourceMappingURL=reducer.js.map