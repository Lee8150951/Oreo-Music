import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../reducer';
import home from '../../assets/icon/home.png';
import homeActive from '../../assets/icon/home-active.png';
import focus from '../../assets/icon/focus.png';
import focusActive from '../../assets/icon/focus-active.png';
import download from '../../assets/icon/download.png';
import downloadActive from '../../assets/icon/download-active.png';
import cloud from '../../assets/icon/cloud.png';
import cloudActive from '../../assets/icon/cloud-active.png';

const initial = [
  {
    title: '发现',
    logo: home,
    logoActive: homeActive,
    active: true,
    path: '/',
  },
  {
    title: '关注',
    logo: focus,
    logoActive: focusActive,
    active: false,
    path: '/focus',
  },
  {
    title: '下载',
    logo: download,
    logoActive: downloadActive,
    active: false,
    path: '/download',
  },
  {
    title: '云盘',
    logo: cloud,
    logoActive: cloudActive,
    active: false,
    path: '/cloud',
  },
];

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: initial,
  reducers: {
    changeActive: (state, action: PayloadAction<string>) => {
      const path = action.payload;
      state.forEach((item) => {
        item.active = item.path === path;
      });
    },
  },
});

export const { changeActive } = navbarSlice.actions;
export const navbar = (state: RootState) => state.navbar;
export default navbarSlice.reducer;
