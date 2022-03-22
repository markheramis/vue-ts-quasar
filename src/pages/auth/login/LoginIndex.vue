<script setup lang="ts">
import useUserStore from '@/stores/user'
import { QBtn } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const feedback = ref('')
const submitBtn = ref(QBtn)
const submitBtnLoading = ref(false)
const showPwd = ref(false)

const clearFeedback = () => {
  feedback.value = ''
}

const submit = async () => {
  submitBtnLoading.value = true
  await userStore
    .Login({ username: username.value, password: password.value })
    .then((result) => {
      if (result.status === 'error') {
        feedback.value = result.message
      } else if (result.status_code === 401) {
        feedback.value = result.errors.message[0]
      } else {
        router.push('/')
      }
    })
    .finally(() => (submitBtnLoading.value = false))
}
</script>

<template>
  <q-card flat bordered class="login__card q-mx-lg q-my-lg q-px-lg q-py-lg">
    <q-card-section class="login__section">
      <q-form class="login__form" @submit.prevent='submit'>
        <q-input
          v-model="username"
          label="Enter Username"
          lazy-rules
          @update:model-value="clearFeedback"
          @keyup.enter="submit"
          autofocus
        >
          <template #prepend>
            <q-icon name='person' />
          </template>
        </q-input>

        <q-input
          v-model="password"
          :type="showPwd ? 'text' : 'password'"
          label="Enter Password"
          lazy-rules
          @update:model-value="clearFeedback"
          @keyup.enter="submit"
        >
          <template #prepend>
            <q-icon name='lock' />
          </template>
          <template #append>
            <q-icon 
              :name="showPwd ? 'visibility' : 'visibility_off'"
              @click='showPwd = !showPwd'
              style='cursor: pointer;'
            />
          </template>
        </q-input>
      </q-form>
      
      <div 
        :visibility="feedback ? 'visible' : 'none'"
        class='login__feedback text-caption text-weight-light'
      >
        <q-icon v-show='feedback' name='warning_amber' class='q-pr-md' />
        {{ feedback }}
    </div>
    </q-card-section>
    <q-card-actions class="login__actions">
      <q-btn
        ref="submitBtn"
        label="Proceed"
        type="submit"
        color='blue-grey-7'
        class="login__actions--submit q-mx-lg q-my-md"
        :loading="submitBtnLoading"
        icon-right='arrow_right_alt'
        @click="submit"
      />

    <div class='login__forgot-pass'>
      <router-link to='/password-reset' class='text-dark'>Forgot Password?</router-link>
    </div>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss">
@import '@/css/quasar.variables.scss';

.login__card {
  max-width: 580px;
  margin: 160px auto;
}

.login__actions--submit {
  width: 100%;
}

.login__section {
  padding-bottom: 0!important;
}

.login__feedback {
  height: 1rem;
  width: 100%;
  color: $loginWarning;
  margin-top: 10px;
  clear: both;
}

.login__forgot-pass {
  margin-top: 20px;
  a {
    text-decoration: none;

    &:hover {
      color: $primary!important;
    }
  }
}
</style>
