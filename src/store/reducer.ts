import { combineReducers } from '@reduxjs/toolkit';
import navbar from './slices/navbarSlice';
import user from './slices/userSlice';
import favor from './slices/favorSlice';
import play from './slices/playSlice';

const reducers = {
  navbar,
  user,
  favor,
  play,
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
