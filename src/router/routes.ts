import { RouteRecordRaw } from 'vue-router'
import Layout from 'layouts/MainLayout.vue'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('pages/auth/login/LoginIndex.vue'),
    name: 'Login'
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: {
      icon: 'home',
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('pages/IndexPage.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: {
      icon: 'person',
    },
    children: [
      {
        path: 'index',
        component: () => import('pages/user/UserIndex.vue'),
        name: 'User Index',
        meta: {
          title: 'User Index',
          icon: 'people',
        },
      },
      {
        path: 'create',
        component: () => import('pages/user/UserCreate.vue'),
        name: 'User Create',
        meta: {
          title: 'User Create',
          icon: 'group_add',
        },
      },
    ],
  },

    {
    path: '/user2',
    component: Layout,
    redirect: '/user/index',
    name: 'User 2',
    meta: {
      icon: 'group',
    },
    children: [
      {
        path: 'index',
        component: () => import('pages/user/UserIndex.vue'),
        name: 'User Index 2',
        meta: {
          title: 'User Index 2',
          icon: 'people',
        },
      },
      {
        path: 'create',
        component: () => import('pages/user/UserCreate.vue'),
        name: 'User Create 2',
        meta: {
          title: 'User Create 2',
          icon: 'group_add',
        },
      },
    ],
  },

]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        component: () => import('pages/user/UserIndex.vue'),
        name: 'User',
        meta: {
          title: 'user',
          icon: 'user',
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default constantRoutes
