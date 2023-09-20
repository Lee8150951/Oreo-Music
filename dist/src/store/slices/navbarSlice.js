"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.navbar = exports.changeActive = exports.navbarSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const home_svg_1 = __importDefault(require("../../assets/svg/home.svg"));
const cloud_svg_1 = __importDefault(require("../../assets/svg/cloud.svg"));
const download_svg_1 = __importDefault(require("../../assets/svg/download.svg"));
const favor_svg_1 = __importDefault(require("../../assets/svg/favor.svg"));
const initial = [
    {
        title: '发现',
        logo: home_svg_1.default,
        logoActive: home_svg_1.default,
        active: true,
        path: '/',
    },
    {
        title: '云盘',
        logo: cloud_svg_1.default,
        logoActive: cloud_svg_1.default,
        active: false,
        path: '/cloud',
    },
    {
        title: '下载',
        logo: download_svg_1.default,
        logoActive: download_svg_1.default,
        active: false,
        path: '/download',
    },
    {
        title: '喜欢',
        logo: favor_svg_1.default,
        logoActive: favor_svg_1.default,
        active: false,
        path: '/favor',
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