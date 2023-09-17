import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../reducer';
import { type PlaylistItemType } from '../types/playlist';

const initial: PlaylistItemType[] = [];

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: initial,
  reducers: {
    changePlaylist: (state, action: PayloadAction<string>) => {},
    insertMusic: (state, action: PayloadAction<PlaylistItemType>) => {
      const newMusic = action.payload;
      state.shift();
      state.unshift(newMusic);
    },
    customPlaylist: (state, action: PayloadAction<string>) => {},
  },
});

export const { changePlaylist, insertMusic, customPlaylist } = playlistSlice.actions;
export const playlist = (state: RootState) => state.playlist;
export default playlistSlice.reducer;
