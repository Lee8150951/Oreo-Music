import { combineReducers } from '@reduxjs/toolkit';
import navbar from './slices/navbarSlice';
import user from './slices/userSlice';

const reducers = {
  navbar,
  user,
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
