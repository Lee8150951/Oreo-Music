"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.play = exports.changePlay = exports.playSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initial = {
    id: -1,
    name: '',
    url: '',
    type: '',
    time: -1,
    size: -1,
    coverImgUrl: '',
    artists: [],
    album: {
        id: -1,
        name: '',
        picUrl: '',
    },
};
exports.playSlice = (0, toolkit_1.createSlice)({
    name: 'play',
    initialState: initial,
    reducers: {
        changePlay: (state, action) => {
            return action.payload;
        },
    },
});
exports.changePlay = exports.playSlice.actions.changePlay;
const play = (state) => state.play;
exports.play = play;
exports.default = exports.playSlice.reducer;
//# sourceMappingURL=playSlice.js.map