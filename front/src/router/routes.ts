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
    path: '/area/:id?',
    component: () => import('pages/public/areas.vue'),
  },
  {
    path: '/adventures',
    component: () => import('pages/public/Adventures.vue'),
  },
  {
    path: '/adventure-details/:id',
    component: () => import('pages/public/adventure-details.vue'),
  },
  {
    path: '/living-beings',
    component: () => import('pages/public/living-beings.vue'),
  },
  {
    path: '/living-being-details/:id',
    component: () => import('pages/public/living-being-details.vue'),
  },
  {
    path: '/private',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'mainMenu',
        component: () => import('pages/admin/admin-home.vue'),
      },
      {
        path: 'users/list',
        name: 'users',
        alias: 'users',
        component: () => import('pages/user/users-list.vue'),
      },
      {
        path: 'users/account',
        name: 'myAccount',
        alias: 'account',
        component: () => import('pages/user/users-account.vue'),
      },
      {
        path: 'areas/list',
        name: 'areas',
        alias: 'areas',
        component: () => import('pages/area/areas-list.vue')
      },
      {
        path: 'areas/create',
        name: 'areaCreation',
        component: () => import('pages/area/areas-creation.vue')
      },
      {
        path: 'areas/update/:id',
        name: 'areaUpdate',
        component: () => import('pages/area/areas-update.vue')
      },
      {
        path: 'classifiers/list',
        name: 'classifiers',
        alias: 'classifiers',
        component: () => import('pages/classifier/classifiers-list.vue')
      },
      {
        path: 'living-beings/list',
        name: 'livingBeings',
        alias: 'living-beings',
        component: () => import('pages/living-being/living-being-list.vue')
      },
      {
        path: 'living-beings/creation',
        name: 'livingBeingCreation',
        component: () => import('pages/living-being/living-beings-creation.vue')
      },
      {
        path: 'living-beings/update/:id',
        name: 'livingBeingUpdate',
        component: () => import('pages/living-being/living-beings-update.vue')
      },
      {
        path: 'adventures/list',
        name: 'adventures',
        alias: 'adventures',
        component: () => import('pages/adventure/adventures-list.vue')
      },
      {
        path: 'adventures/creation',
        name: 'adventureCreation',
        component: () => import('pages/adventure/adventures-creation.vue')
      },
      {
        path: 'adventures/update/:id',
        name: 'adventureUpdate',
        component: () => import('pages/adventure/adventures-update.vue')
      },
      {
        path: 'visits',
        name: 'visits',
        component: () => import('pages/admin/Visit.vue')
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: () => import('pages/admin/Transaction.vue')
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/admin/admin-dashboard.vue'),
      },
    ]
  },
  {
    path: '/users/authentication',
    name: 'users-authentication',
    alias: '/authentication',
    component: () => import('pages/user/users-authentication.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
