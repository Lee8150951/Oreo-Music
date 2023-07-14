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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Home_1 = __importDefault(require("../views/Home"));
const Login_1 = __importDefault(require("../views/Login"));
const Register_1 = __importDefault(require("../views/Register"));
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home_1.default,
    },
    {
        path: '/cloud',
        name: 'cloud',
        component: (0, react_1.lazy)(() => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.resolve().then(() => __importStar(require('../views/Cloud'))); })),
    },
    {
        path: '/download',
        name: 'download',
        component: (0, react_1.lazy)(() => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.resolve().then(() => __importStar(require('../views/Download'))); })),
    },
    {
        path: '/focus',
        name: 'focus',
        component: (0, react_1.lazy)(() => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.resolve().then(() => __importStar(require('../views/Focus'))); })),
    },
    {
        path: '/playlist',
        name: 'playlist',
        component: (0, react_1.lazy)(() => __awaiter(void 0, void 0, void 0, function* () { return yield Promise.resolve().then(() => __importStar(require('../views/Playlist'))); })),
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