import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../reducer';
import utils from '../../util/utils';

const initial: number[] = [];

export const favorSlice = createSlice({
  name: 'favor',
  initialState: initial,
  reducers: {
    saveFavor: (state, action: PayloadAction<number[]>) => {
      return action.payload;
    },
    addFavor: (state, action: PayloadAction<number>) => {
      const list = utils.deepClone(state);
      list.push(action.payload);
      return list;
    },
    reduceFavor: (state, action: PayloadAction<number>) => {
      const list = utils.deepClone(state);
      return list.filter((item: number) => item !== action.payload);
    },
  },
});

export const { saveFavor, addFavor, reduceFavor } = favorSlice.actions;
export const favor = (state: RootState) => state.favor;
export default favorSlice.reducer;
