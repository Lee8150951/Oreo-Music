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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processColorMain = exports.getColorRenderer = void 0;
const electron_1 = require("electron");
const channel_types_1 = require("../channel-types");
const node_vibrant_1 = __importDefault(require("node-vibrant"));
const getColorRenderer = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield electron_1.ipcRenderer.invoke(channel_types_1.COLOR_CHANNEL, url);
});
exports.getColorRenderer = getColorRenderer;
const processColorMain = () => __awaiter(void 0, void 0, void 0, function* () {
    electron_1.ipcMain.handle(channel_types_1.COLOR_CHANNEL, (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        const vibrant = new node_vibrant_1.default(args);
        const colors = [];
        try {
            const palette = yield vibrant.getPalette();
            if (palette.Vibrant != null) {
                const rgb = palette.Vibrant.getRgb();
                const rgbString = rgb.map((value) => Math.round(value).toString());
                colors.push(`rgb(${rgbString.join(', ')})`);
            }
            if (palette.Muted != null) {
                const rgb = palette.Muted.getRgb();
                const rgbString = rgb.map((value) => Math.round(value).toString());
                colors.push(`rgb(${rgbString.join(', ')})`);
            }
            if (palette.DarkVibrant != null) {
                const rgb = palette.DarkVibrant.getRgb();
                const rgbString = rgb.map((value) => Math.round(value).toString());
                colors.push(`rgb(${rgbString.join(', ')})`);
            }
            if (palette.DarkMuted != null) {
                const rgb = palette.DarkMuted.getRgb();
                const rgbString = rgb.map((value) => Math.round(value).toString());
                colors.push(`rgb(${rgbString.join(', ')})`);
            }
        }
        catch (error) {
            console.error(error);
        }
        return colors;
    }));
});
exports.processColorMain = processColorMain;
//# sourceMappingURL=colorChannel.js.map