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
const electron_1 = require("electron");
const electron_log_1 = __importDefault(require("electron-log"));
const path = __importStar(require("path"));
const colorChannel_1 = require("../src/channel/play/colorChannel");
const createWindow = () => __awaiter(void 0, void 0, void 0, function* () {
    const win = new electron_1.BrowserWindow({
        minWidth: 1100,
        minHeight: 770,
        width: 1100,
        height: 770,
        resizable: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, '../src/channel/index.js'),
        },
    });
    yield win.loadURL('http://localhost:3000/');
});
electron_1.app.whenReady().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // Log configure
    electron_log_1.default.transports.console.format = '[{y}-{m}-{d} {h}:{i}:{s}] [{level}]{scope} {text}';
    electron_log_1.default.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}] [{level}]{scope} {text}';
    // Register the ipc channel
    yield (0, colorChannel_1.processColorMain)();
    try {
        yield createWindow();
        electron_1.app.on('activate', () => {
            if (electron_1.BrowserWindow.getAllWindows().length === 0) {
                (() => __awaiter(void 0, void 0, void 0, function* () {
                    yield createWindow();
                }))();
            }
        });
        electron_log_1.default.info('The application started successfully');
    }
    catch (error) {
        electron_log_1.default.error(`An error occurred when the application started: ${String(error)}`);
    }
}));
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
//# sourceMappingURL=main.js.map