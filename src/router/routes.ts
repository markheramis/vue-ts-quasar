import { RouteRecordRaw } from 'vue-router'
import Layout from 'layouts/MainLayout.vue'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('pages/auth/login/LoginIndex.vue'),
    name: 'Login',
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
          title: 'Show User List',
          icon: 'people',
        },
      },
      {
        path: 'create',
        component: () => import('pages/user/UserCreate.vue'),
        name: 'User Create',
        meta: {
          title: 'Create New',
          icon: 'group_add',
        },
      },
    ],
  },

  {
    path: '/role',
    component: Layout,
    redirect: '/role/index',
    name: 'Role',
    meta: {
      icon: 'group',
    },
    children: [
      {
        path: 'index',
        component: () => import('pages/user/UserIndex.vue'),
        name: 'Role Index',
        meta: {
          title: 'Show Roles List',
          icon: 'people',
        },
      },
      {
        path: 'create',
        component: () => import('pages/user/UserCreate.vue'),
        name: 'Role Create',
        meta: {
          title: 'Create Role',
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
