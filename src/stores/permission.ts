import { asyncRoutes, constantRoutes } from '@/router/routes'
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import pinia from '@/stores/index'


/**
 * TYPES
 */

export interface IRouteRecordNormalized extends RouteRecordNormalized {
  meta: {
    roles?: string[]
  }
}

export interface IPermissionState {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

const hasPermission = (roles: string[], route: IRouteRecordNormalized) => {
  if (route.meta) {
    return roles.some((role) => {
      if (route.meta.roles) {
        return route.meta.roles.includes(role)
      }
    })
  } else {
    return true
  }
}

export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  roles: string[]
) => {
  const res: RouteRecordRaw[] = []
  /* eslint-disable-next-line */
  routes.forEach((route: any) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}


/**
 * STATE
 */

const state: IPermissionState = {
  routes: [],
  dynamicRoutes: [],
}


const GenerateRoutes = async(roles: string[]) => {
  /* eslint-disable-next-line */
  let accessedRoutes: any

  if (roles.includes('administrator')) {
    accessedRoutes = asyncRoutes
  } else {
    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
  }

  store.routes = constantRoutes.concat(accessedRoutes)
  store.dynamicRoutes = accessedRoutes
}


/**
 * Define a store instance for the app permissions.
 */

const usePermissionStore = defineStore('permission', {
  state: () => state,
  actions: { GenerateRoutes },
})


/**
 * Hoist this variable for local use.
 */

const store = usePermissionStore(await pinia({}))


/**
 * Export for global use
 */

export default usePermissionStore
