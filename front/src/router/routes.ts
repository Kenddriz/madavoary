import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
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
        component: () => import('pages/admin/User.vue')
      },
      {
        path: 'my-account',
        component: () => import('pages/account/MyAccount.vue')
      },
      {
        path: 'collections',
        component: () => import('pages/collection/Collection.vue')
      },
      {
        path: 'park',
        component: () => import('pages/park/Park.vue')
      },
    ],
  },
  {
    path: '/auth/sign-in-sign-up',
    component: () => import('src/pages/account/SignInSingUp.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
