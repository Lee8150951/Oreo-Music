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
// Get the song's url
const http_1 = __importDefault(require("../http"));
const getSongUrl = (sid, level) => __awaiter(void 0, void 0, void 0, function* () {
    return yield http_1.default.get(`/song/url/v1?id=${sid}&level=${level}`);
});
// Get music detail
const getSongDetail = (sid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield http_1.default.get(`/song/detail?ids=${sid}`);
});
// Get lyric
const getSongLyric = (sid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield http_1.default.get(`/lyric/new?id=${sid}`);
});
exports.default = {
    getSongUrl,
    getSongDetail,
    getSongLyric,
};
//# sourceMappingURL=playApi.js.map