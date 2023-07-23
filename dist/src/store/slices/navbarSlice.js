"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.navbar = exports.changeActive = exports.navbarSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const home_png_1 = __importDefault(require("../../assets/icon/home.png"));
const home_active_png_1 = __importDefault(require("../../assets/icon/home-active.png"));
const focus_png_1 = __importDefault(require("../../assets/icon/focus.png"));
const focus_active_png_1 = __importDefault(require("../../assets/icon/focus-active.png"));
const download_png_1 = __importDefault(require("../../assets/icon/download.png"));
const download_active_png_1 = __importDefault(require("../../assets/icon/download-active.png"));
const cloud_png_1 = __importDefault(require("../../assets/icon/cloud.png"));
const cloud_active_png_1 = __importDefault(require("../../assets/icon/cloud-active.png"));
const initial = [
    {
        title: '发现',
        logo: home_png_1.default,
        logoActive: home_active_png_1.default,
        active: true,
        path: '/',
    },
    {
        title: '关注',
        logo: focus_png_1.default,
        logoActive: focus_active_png_1.default,
        active: false,
        path: '/focus',
    },
    {
        title: '下载',
        logo: download_png_1.default,
        logoActive: download_active_png_1.default,
        active: false,
        path: '/download',
    },
    {
        title: '云盘',
        logo: cloud_png_1.default,
        logoActive: cloud_active_png_1.default,
        active: false,
        path: '/cloud',
    },
];
exports.navbarSlice = (0, toolkit_1.createSlice)({
    name: 'navbar',
    initialState: initial,
    reducers: {
        changeActive: (state, action) => {
            const path = action.payload;
            state.forEach((item) => {
                item.active = item.path === path;
            });
        },
    },
});
exports.changeActive = exports.navbarSlice.actions.changeActive;
const navbar = (state) => state.navbar;
exports.navbar = navbar;
exports.default = exports.navbarSlice.reducer;
//# sourceMappingURL=navbarSlice.js.map