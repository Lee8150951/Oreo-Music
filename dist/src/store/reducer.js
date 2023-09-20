"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const navbarSlice_1 = __importDefault(require("./slices/navbarSlice"));
const userSlice_1 = __importDefault(require("./slices/userSlice"));
const favorSlice_1 = __importDefault(require("./slices/favorSlice"));
const playSlice_1 = __importDefault(require("./slices/playSlice"));
const playlistSlice_1 = __importDefault(require("./slices/playlistSlice"));
const reducers = {
    navbar: navbarSlice_1.default,
    user: userSlice_1.default,
    favor: favorSlice_1.default,
    play: playSlice_1.default,
    playlist: playlistSlice_1.default,
};
const rootReducer = (0, toolkit_1.combineReducers)(reducers);
exports.default = rootReducer;
//# sourceMappingURL=reducer.js.map