"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlist = exports.customPlaylist = exports.insertMusic = exports.changePlaylist = exports.playlistSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initial = [];
exports.playlistSlice = (0, toolkit_1.createSlice)({
    name: 'playlist',
    initialState: initial,
    reducers: {
        changePlaylist: (state, action) => {
            return action.payload;
        },
        insertMusic: (state, action) => {
            const newMusic = action.payload;
            state.shift();
            state.unshift(newMusic);
        },
        customPlaylist: (state, action) => { },
        playMusic: (state) => {
            state.shift();
        },
    },
});
_a = exports.playlistSlice.actions, exports.changePlaylist = _a.changePlaylist, exports.insertMusic = _a.insertMusic, exports.customPlaylist = _a.customPlaylist;
const playlist = (state) => state.playlist;
exports.playlist = playlist;
exports.default = exports.playlistSlice.reducer;
//# sourceMappingURL=playlistSlice.js.map