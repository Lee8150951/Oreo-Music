import { combineReducers } from '@reduxjs/toolkit';
import navbar from './slices/navbarSlice';

const reducers = {
  navbar,
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
