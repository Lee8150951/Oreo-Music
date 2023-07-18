"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const createWindow = () => __awaiter(void 0, void 0, void 0, function* () {
    const win = new electron_1.BrowserWindow({
        width: 1100,
        height: 780,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
        },
    });
    yield win.loadURL('http://localhost:3000/');
});
electron_1.app.whenReady().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                yield createWindow();
            }))();
        }
    });
}));
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
//# sourceMappingURL=main.js.map