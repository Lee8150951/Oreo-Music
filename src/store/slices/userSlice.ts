import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserType } from '../types/user';
import { type RootState } from '../reducer';
import utils from '../../util/utils';

const initial: UserType = {};

export const userSlice = createSlice({
  name: 'user',
  initialState: initial,
  reducers: {
    saveUser: (state, action: PayloadAction<UserType>) => {
      const profile = action.payload;
      state = utils.deepClone(profile);
    },
  },
});

export const { saveUser } = userSlice.actions;
export const user = (state: RootState) => state.user;
export default userSlice.reducer;
