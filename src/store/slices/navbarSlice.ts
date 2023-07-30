import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type NavbarType } from '../types/navbar';
import { type RootState } from '../reducer';
import HomeSvg from '../../assets/svg/home.svg';
import CloudSvg from '../../assets/svg/cloud.svg';
import DownloadSvg from '../../assets/svg/download.svg';
import FavorSvg from '../../assets/svg/favor.svg';

const initial: NavbarType[] = [
  {
    title: '发现',
    logo: HomeSvg,
    logoActive: HomeSvg,
    active: true,
    path: '/',
  },
  {
    title: '云盘',
    logo: CloudSvg,
    logoActive: CloudSvg,
    active: false,
    path: '/cloud',
  },
  {
    title: '下载',
    logo: DownloadSvg,
    logoActive: DownloadSvg,
    active: false,
    path: '/download',
  },
  {
    title: '喜欢',
    logo: FavorSvg,
    logoActive: FavorSvg,
    active: false,
    path: '/favor',
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
