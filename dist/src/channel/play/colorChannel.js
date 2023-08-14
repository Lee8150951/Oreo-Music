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
exports.processColorMain = exports.getColorRenderer = void 0;
const electron_1 = require("electron");
const channel_types_1 = require("../channel-types");
const getColorRenderer = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield electron_1.ipcRenderer.invoke(channel_types_1.COLOR_CHANNEL, url);
});
exports.getColorRenderer = getColorRenderer;
const processColorMain = () => __awaiter(void 0, void 0, void 0, function* () {
    electron_1.ipcMain.handle(channel_types_1.COLOR_CHANNEL, (event, args) => __awaiter(void 0, void 0, void 0, function* () {
        return args;
    }));
});
exports.processColorMain = processColorMain;
//# sourceMappingURL=colorChannel.js.map