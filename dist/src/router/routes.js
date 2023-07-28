"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Home_1 = __importDefault(require("../views/Home"));
const Login_1 = __importDefault(require("../views/Login"));
const Register_1 = __importDefault(require("../views/Register"));
const Cloud_1 = __importDefault(require("../views/Cloud"));
const Download_1 = __importDefault(require("../views/Download"));
const Favor_1 = __importDefault(require("../views/Favor"));
const Playlist_1 = __importDefault(require("../views/Playlist"));
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home_1.default,
    },
    {
        path: '/cloud',
        name: 'cloud',
        component: Cloud_1.default,
    },
    {
        path: '/download',
        name: 'download',
        component: Download_1.default,
    },
    {
        path: '/favor',
        name: 'favor',
        component: Favor_1.default,
    },
    {
        path: '/playlist',
        name: 'playlist',
        component: Playlist_1.default,
    },
    {
        path: '/login',
        name: 'login',
        component: Login_1.default,
        meta: {
            extra: true,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register_1.default,
        meta: {
            extra: true,
        },
    },
];
exports.default = routes;
//# sourceMappingURL=routes.js.map