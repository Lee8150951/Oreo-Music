import { combineReducers } from '@reduxjs/toolkit';
import navbar from './slices/navbarSlice';
import user from './slices/userSlice';
import favor from './slices/favorSlice';

const reducers = {
  navbar,
  user,
  favor,
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
