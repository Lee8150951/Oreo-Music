import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../reducer';
import { type PlaySongType } from '../types/play';

const initial: PlaySongType = {
  id: -1,
  name: '',
  coverImgUrl: '',
  artists: '',
  album: '',
};

export const playSlice = createSlice({
  name: 'play',
  initialState: initial,
  reducers: {
    changePlay: (state, action: PayloadAction<PlaySongType>) => {
      return action.payload;
    },
  },
});

export const { changePlay } = playSlice.actions;
export const play = (state: RootState) => state.play;
export default playSlice.reducer;
