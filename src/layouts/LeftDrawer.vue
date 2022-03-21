<script setup lang="ts">
import constantRoutes from '@/router/routes'
import { RouteRecordName, RouteRecordRaw, useRouter } from 'vue-router'

/**
 * The router instance
 */
const router = useRouter()

/**
 * Set variable link current route path.
 */
const link = ref(router.currentRoute.value.path)

/**
 * Only one nested menu is expanded at a time.
 *
 * @param {string} parentPath - a string containing the parent route path
 * @param {Object} children -  an array of child routes
 * @returns boolean
 */
const handleExpand = (
  parentPath: string,
  children: RouteRecordRaw[]
): boolean => {
  let temp = false
  children.forEach((child) => {
    const currPath = `${parentPath}/${child.path}`
    if (currPath === link.value) temp = true
  })
  return temp
}

/**
 * Resolve route name by asserting it as string.
 *
 * @param {Object|undefied} [name] - the name property of the route
 * @returns string
 */
const resolveRouteName = (name: RouteRecordName | undefined) => {
  if (typeof name !== 'symbol') return name as string

  return ''
}

/**
 * Resolve full path of either the parent or child route.
 *
 * @param {string} parentPath - string containing the parent route's path
 * @param {childRoute=} childRoute - an optional single child route
 @ returns string
 */
const resolveFullPath = (parentPath: string, childRoute?: RouteRecordRaw) => {
  if (childRoute) return `${parentPath}/${childRoute.path}`

  return parentPath
}

/**
 * Resolve name of the route icon. Assert it as string. Returns empty by default.
 *
 * @param {Object} route - the route object
 * @returns string
 */
const resolveRouteIcon = (route: RouteRecordRaw): string => {
  let temp = ''
  if (route) temp = route.meta?.icon as string
  return temp
}
</script>

<template>
  <q-list>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Company Logo</q-toolbar-title>
    </q-toolbar>

    <template v-for="route in constantRoutes" :key="route">
      <q-item
        v-if="route.children && route.children.length < 2"
        :to="route.path"
        :active="link === resolveFullPath(route.path)"
        @click="link = resolveFullPath(route.path)"
      >
        <q-item-section avatar>
          <q-icon :name="resolveRouteIcon(route)" />
        </q-item-section>

        <q-item-section> {{ route.name }} </q-item-section>
      </q-item>

      <q-expansion-item
        v-if="route.children && route.children.length > 1"
        :model-value="handleExpand(route.path, route.children)"
        :label="resolveRouteName(route.name)"
        :icon="resolveRouteIcon(route)"
        :content-inset-level="0.5"
      >
        <q-list v-for="(child, index) in route.children" :key="index">
          <q-item
            :to="resolveFullPath(route.path, child)"
            :active="link === resolveFullPath(route.path, child)"
            @click="link = resolveFullPath(route.path, child)"
          >
            <!--
              <q-item-section avatar>
                <q-icon :name="resolveRouteIcon(route, index)" />
              </q-item-section>
              -->
            <q-item-section> {{ child.name }} </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </template>
  </q-list>
</template>

<style lang="scss"></style>
