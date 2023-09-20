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
const http_1 = __importDefault(require("../http"));
const playlistApi_1 = __importDefault(require("./playlistApi"));
// Get all favorite songs
const getAllFavor = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const playlist = (yield http_1.default.get(`/user/playlist?uid=${uid}`));
    const favorInfo = playlist.playlist[0];
    const pid = favorInfo.id;
    const detail = (yield playlistApi_1.default.getPlaylistDetail(pid));
    return detail.playlist;
});
exports.default = {
    getAllFavor,
};
//# sourceMappingURL=favorApi.js.map