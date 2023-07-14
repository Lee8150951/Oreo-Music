import { lazy } from 'react';
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/cloud',
    name: 'cloud',
    component: lazy(async () => await import('../views/Cloud')),
  },
  {
    path: '/download',
    name: 'download',
    component: lazy(async () => await import('../views/Download')),
  },
  {
    path: '/focus',
    name: 'focus',
    component: lazy(async () => await import('../views/Focus')),
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: lazy(async () => await import('../views/Playlist')),
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
