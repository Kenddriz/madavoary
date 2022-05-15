import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/admin-home.vue'),
      },
      {
        path: 'users/authentication',
        name: 'users-authentication',
        alias: 'authentication',
        component: () => import('pages/users-authentication.vue'),
      },
      {
        path: 'users/list',
        name: 'users-list',
        alias: 'users',
        component: () => import('pages/users-list.vue'),
      },
      {
        path: 'users/account',
        name: 'users-account',
        alias: 'account',
        component: () => import('pages/users-account.vue'),
      },
      {
        path: 'areas/list',
        name: 'areas-list',
        alias: 'areas',
        component: () => import('pages/areas-list.vue')
      },
      {
        path: 'areas/create',
        name: 'areas-creation',
        component: () => import('pages/areas-creation.vue')
      },
      {
        path: 'classifiers/list',
        name: 'classifiers-list',
        alias: 'classifiers',
        component: () => import('pages/classifiers-list.vue')
      },
      {
        path: 'living-beings/list',
        name: 'living-beings-list',
        alias: 'living-beings',
        component: () => import('pages/living-being-list.vue')
      },
      {
        path: 'living-being/creation',
        name: 'living-being-creation',
        component: () => import('components/living-being/living-being-form.vue')
      },
      {
        path: 'adventures/list',
        name: 'adventures-list',
        alias: 'adventures',
        component: () => import('pages/adventures-list.vue')
      },
      {
        path: 'adventures/creation',
        name: 'adventures-creation',
        component: () => import('pages/adventures-creation.vue')
      },
      {
        path: 'adventures/update/:id',
        name: 'adventures-update',
        component: () => import('pages/adventures-update.vue')
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
      {
        path: 'users',
        component: () => import('pages/user/User.vue')
      },
      {
        path: 'my-account',
        component: () => import('pages/user/users-account.vue')
      },
      {
        path: 'classifications',
        component: () => import('pages/classification/Classification.vue')
      },
      {
        path: 'area',
        component: () => import('pages/area/Area.vue')
      },
      {
        path: 'living-being',
        component: () => import('pages/living-being/LivingBeing.vue')
      },
    ],
  },
  {
    path: '/sign-in-sign-up',
    component: () => import('src/pages/user/SignInSingUp.vue')
  },*/
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
