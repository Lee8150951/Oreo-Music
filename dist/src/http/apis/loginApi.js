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
// Get login qr code
const getLoginCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = Date.now();
    const qrKeyRes = (yield http_1.default.get(`/login/qr/key?timestamp=${timestamp}`));
    const key = qrKeyRes.data.unikey;
    const res = (yield http_1.default.get(`/login/qr/create?key=${key}&qrimg=true&timestamp=${timestamp}`));
    return [res.data.qrimg, key];
});
// Get check status
const getCheckStatus = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = Date.now();
    return yield http_1.default.get(`/login/qr/check?key=${key}&timestamp=${timestamp}&noCookie=true`);
});
// Log out
const userLogout = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield http_1.default.get('/logout');
});
exports.default = {
    getLoginCode,
    getCheckStatus,
    userLogout,
};
//# sourceMappingURL=loginApi.js.map