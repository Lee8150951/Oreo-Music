import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Cloud from '../views/Cloud';
import Download from '../views/Download';
import Favor from '../views/Favor';
import Playlist from '../views/Playlist';
import Setting from '../views/Setting';
import Singer from '../views/Singer';
import Album from '../views/Album';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/cloud',
    name: 'cloud',
    component: Cloud,
  },
  {
    path: '/download',
    name: 'download',
    component: Download,
  },
  {
    path: '/favor',
    name: 'favor',
    component: Favor,
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: Playlist,
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
  },
  {
    path: '/album/:id',
    name: 'album',
    component: Album,
  },
  {
    path: '/singer/:id',
    name: 'singer',
    component: Singer,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      extra: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      extra: true,
    },
  },
];

export default routes;
