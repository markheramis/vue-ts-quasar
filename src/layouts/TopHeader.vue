<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '../stores/user';


const props = defineProps({
  drawerIsShown: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['drawerIsShown'])

const router = useRouter()
const route = useRoute()
const store = useUserStore()

const logout = async() => {
  store.ResetToken()
  router.push(`/login?redirect=${route.fullPath}`)
}

const toggleDrawerShow = () => {
  emit('drawerIsShown', !props.drawerIsShown)
}
</script>

<style lang='scss'>
.topheader__actions {
  min-width: 150px;
}
</style>

<template>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleDrawerShow"
      />

      <q-toolbar-title> App </q-toolbar-title>

      <q-btn
        round
        color='primary'
        icon='account_circle'
      >
      <q-menu
        transition-show="flip-right"
        transition-hide="flip-left"
        auto-close
        class="topheader__actions"
      >
        <q-list style="min-width: 100px">
          <q-item clickable>
            <q-item-section>Account Settings</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Support</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable @click='logout'>
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    </q-toolbar>
</template>
