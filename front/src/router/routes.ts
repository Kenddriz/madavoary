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
        component: () => import('pages/user/User.vue')
      },
      {
        path: 'my-account',
        component: () => import('pages/user/MyAccount.vue')
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
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
