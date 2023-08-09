"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.saveUser = exports.userSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const utils_1 = __importDefault(require("../../util/utils"));
const initial = {};
exports.userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState: initial,
    reducers: {
        saveUser: (state, action) => {
            const profile = action.payload;
            return utils_1.default.deepClone(profile);
        },
    },
});
exports.saveUser = exports.userSlice.actions.saveUser;
const user = (state) => state.user;
exports.user = user;
exports.default = exports.userSlice.reducer;
//# sourceMappingURL=userSlice.js.map