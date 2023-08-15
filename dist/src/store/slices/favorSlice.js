"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.favor = exports.reduceFavor = exports.addFavor = exports.saveFavor = exports.favorSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const utils_1 = __importDefault(require("../../util/utils"));
const initial = [];
exports.favorSlice = (0, toolkit_1.createSlice)({
    name: 'favor',
    initialState: initial,
    reducers: {
        saveFavor: (state, action) => {
            return action.payload;
        },
        addFavor: (state, action) => {
            const list = utils_1.default.deepClone(state);
            list.push(action.payload);
            return list;
        },
        reduceFavor: (state, action) => {
            const list = utils_1.default.deepClone(state);
            return list.filter((item) => item !== action.payload);
        },
    },
});
_a = exports.favorSlice.actions, exports.saveFavor = _a.saveFavor, exports.addFavor = _a.addFavor, exports.reduceFavor = _a.reduceFavor;
const favor = (state) => state.favor;
exports.favor = favor;
exports.default = exports.favorSlice.reducer;
//# sourceMappingURL=favorSlice.js.map