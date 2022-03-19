import { RouteRecordRaw } from 'vue-router'
import Layout from 'layouts/MainLayout.vue'

const constantRoutes: RouteRecordRaw[] = [

  {
    path: '/login',
    component: () => import('pages/auth/login/LoginIndex.vue'),
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      { 
        path: 'dashboard',
        component: () => import('pages/IndexPage.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
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
          icon: 'user'
        }
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('pages/ErrorNotFound.vue'),
  }

]

export default constantRoutes
