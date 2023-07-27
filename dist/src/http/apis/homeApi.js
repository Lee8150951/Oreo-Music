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
// Get recommend playlist
const getPlaylist = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield http_1.default.get('/personalized');
});
// Get recommend singer
const getSinger = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield http_1.default.get('/top/artists');
});
exports.default = {
    getPlaylist,
    getSinger,
};
//# sourceMappingURL=homeApi.js.map