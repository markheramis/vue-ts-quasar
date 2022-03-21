<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <TopHeader
        :drawer-is-shown="drawerIsShown"
        @drawer-is-shown="handleDrawerIsShown"
      />
    </q-header>

    <q-drawer v-model="drawerIsShown" show-if-above bordered>
      <left-drawer />
    </q-drawer>

    <q-page-container>
      <router-view :key='key' v-slot='{ Component }'>
        <transition
          appear
          name='fade-transform'
          mode='out-in'
        >
          <keep-alive>
           <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import TopHeader from './TopHeader.vue'
import LeftDrawer from './LeftDrawer.vue'
import { useRoute } from 'vue-router';

const drawerIsShown = ref(false)

const route = useRoute()

const key = computed(() => route.path)

const handleDrawerIsShown = (event: boolean) => {
  drawerIsShown.value = event
}
</script>
