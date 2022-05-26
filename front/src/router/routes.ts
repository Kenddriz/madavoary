import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/public/HomeLayout.vue'),
    children: [
      {
        path: '',
        alias: 'accueil',
        component: () => import('pages/public/Home.vue')
      },
    ],
  },
  {
    path: '/private',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/admin/admin-home.vue'),
      },
      {
        path: 'users/authentication',
        name: 'users-authentication',
        alias: 'authentication',
        component: () => import('pages/user/users-authentication.vue'),
      },
      {
        path: 'users/list',
        name: 'users-list',
        alias: 'users',
        component: () => import('pages/user/users-list.vue'),
      },
      {
        path: 'users/account',
        name: 'users-account',
        alias: 'account',
        component: () => import('pages/user/users-account.vue'),
      },
      {
        path: 'areas/list',
        name: 'areas-list',
        alias: 'areas',
        component: () => import('pages/area/areas-list.vue')
      },
      {
        path: 'areas/create',
        name: 'areas-creation',
        component: () => import('pages/area/areas-creation.vue')
      },
      {
        path: 'areas/update/:id',
        name: 'areas-update',
        component: () => import('pages/area/areas-update.vue')
      },
      {
        path: 'classifiers/list',
        name: 'classifiers-list',
        alias: 'classifiers',
        component: () => import('pages/classifier/classifiers-list.vue')
      },
      {
        path: 'living-beings/list',
        name: 'living-beings-list',
        alias: 'living-beings',
        component: () => import('pages/living-being/living-being-list.vue')
      },
      {
        path: 'living-beings/creation',
        name: 'living-beings-creation',
        component: () => import('pages/living-being/living-beings-creation.vue')
      },
      {
        path: 'living-beings/update/:id',
        name: 'living-beings-update',
        component: () => import('pages/living-being/living-beings-update.vue')
      },
      {
        path: 'adventures/list',
        name: 'adventures-list',
        alias: 'adventures',
        component: () => import('pages/adventure/adventures-list.vue')
      },
      {
        path: 'adventures/creation',
        name: 'adventures-creation',
        component: () => import('pages/adventure/adventures-creation.vue')
      },
      {
        path: 'adventures/update/:id',
        name: 'adventures-update',
        component: () => import('pages/adventure/adventures-update.vue')
      },
    ]
  },
  /*{
    path: '/admin',
    alias: ['/invited', '/'],
    component: () => import('layouts/BackOfficeLayout.vue'),
    children: [
      {
        path: '',
        alias: 'dashboard',
        component: () => import('pages/admin/Dashboard.vue')
      },
  },*/
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
