<script setup lang='ts'>
import useUserStore from '@/stores/user';
import { QBtn } from 'quasar';
import { useRouter } from 'vue-router';


const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const feedback = ref('')
const submitBtn = ref(QBtn)
const submitBtnLoading = ref(false)

const clearFeedback = () => {
  feedback.value = ''
}

const submit = async() => {
  submitBtnLoading.value = true
  await userStore.Login({ username: username.value, password: password.value })
  .then(result => {
    if (result.status === 'error') {
      feedback.value = result.message 
    } else {
      router.push('/')
    }
  })
  .finally(() => submitBtnLoading.value = false)
}
</script>

<template>
  <q-card flat bordered class='login__card q-mx-lg q-my-lg'>
    <q-card-section class='login__section'>
      <q-form class='login__form'>
        <q-input
          v-model='username'
          label='Enter Username'
          lazy-rules
          @update:model-value='clearFeedback'
          @keyup.enter='submit'
        />

        <q-input
          v-model='password'
          type='password'
          label='Enter Password'
          lazy-rules
          @update:model-value='clearFeedback'
          @keyup.enter='submit'
        />
      </q-form>

      <div class='login__feedback'>
        <p v-show='feedback'>{{ feedback }}</p>
      </div>
    </q-card-section>
    <q-card-actions class='login__actions'>
      <q-btn
        ref='submitBtn'
        label='Submit'
        type='submit'
        color='primary'
        class='login__actions--submit q-mx-lg q-my-md'
        :loading='submitBtnLoading'
        @click='submit'
      />
    </q-card-actions>
  </q-card>
</template>

<style lang='scss'>
.login__card {
  width: 600px;
  margin: 160px auto;
}

.login__actions--submit {
  width: 100%;
}

.login__feedback {
  height: 1rem;
  color: red;
  margin-top: 20px;
}
</style>
