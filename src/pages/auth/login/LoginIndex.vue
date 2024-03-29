<script setup lang="ts">
import useUserStore from '@/stores/user'
import { getToken, Token } from '@/utils/storage'
import { QBtn, QInput } from 'quasar'
import { useRouter } from 'vue-router'

/**
 * The router and user store intances
 */

const router = useRouter()
const userStore = useUserStore()

/**
 * For two-way attribute binding on
 * form input elements.
 */

const login = ref({
  username: '',
  password: '',
})
const feedback = ref('')
const submitBtn = ref<QBtn | null>(null)
const submitBtnLoading = ref(false)
const showPwd = ref(false)
const loginPassword = ref<QInput | null>(null)

/**
 * Watch for the login token stored in the
 * app device.
 */

const loginToken = computed(() => getToken(Token.login) as string)

/**
 * Clears the form feedback paragraph.
 */

const clearFeedback = () => {
  feedback.value = ''
}

/**
 * Handle user login into the app. Determines
 * the kind of authentication according
 * to user's preferred method.
 */

const submit = async () => {
  submitBtnLoading.value = true

  try {
    const { data } = await userStore.Login({
      username: login.value.username,
      password: login.value.password,
    })

    if (data.status_code === 401) throw Error(data.errors.message[0])

    if (data.status === 'error') throw Error(data.message)

    if (data.data.verify)
      /**
       * If user has enabled MFA, present the OTP form
       * before accessing the dashboard. OTP form requires
       * to be passed a token prop.
       */

      router.push({ name: 'Mfa', params: { token: data.token } })
    /**
     * else dashboard is accessible, no mfa is set
     */ else router.push('/')
  } catch (error) {
    /**
     * Handle err. Need to type check
     * as error is of type unknown in TS.
     */

    if (error instanceof Error) feedback.value = error.message
  } finally {
    /**
     * Enable submit after requests are handled
     */

    submitBtnLoading.value = false
  }
}

/**
 * Lifecycle Hooks:
 * https://vuejs.org/guide/essentials/lifecycle.html
 */

onBeforeMount(async () => {
  /**
   * If user login token is already set, then
   * proceed to OTP form.
   */

  if (loginToken.value)
    router.push({ name: 'Mfa', params: { token: loginToken.value } })
})

watch(
  () => showPwd.value,
  async () => {
    if (loginPassword.value) {
      const input = loginPassword.value.getNativeElement() as HTMLInputElement
      await nextTick(() => input.focus())
    }
  }
)
</script>

<template>
  <q-card
    v-if="!loginToken"
    class="login__card q-mx-lg q-my-lg q-px-lg q-py-lg"
    flat
    bordered
  >
    <q-card-section class="login__section">
      <q-form class="login__form" @submit.prevent="submit">
        <q-input
          v-model="login.username"
          label="Enter Username"
          lazy-rules
          @update:model-value="clearFeedback"
          @keyup.enter="submit"
          autofocus
        >
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input
          ref="loginPassword"
          v-model="login.password"
          :type="showPwd ? 'text' : 'password'"
          label="Enter Password"
          lazy-rules
          @update:model-value="clearFeedback"
          @keyup.enter="submit"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>
          <template #append>
            <q-icon
              :name="showPwd ? 'visibility' : 'visibility_off'"
              @click="showPwd = !showPwd"
              style="cursor: pointer"
            />
          </template>
        </q-input>
      </q-form>

      <div
        :visibility="feedback ? 'visible' : 'none'"
        class="login__feedback text-caption text-weight-light"
      >
        <q-icon v-show="feedback" name="warning_amber" class="q-pr-md" />
        {{ feedback }}
      </div>
    </q-card-section>
    <q-card-actions class="login__actions">
      <q-btn
        ref="submitBtn"
        label="Proceed"
        type="submit"
        color="blue-grey-7"
        class="login__actions--submit q-mx-lg q-my-md"
        :loading="submitBtnLoading"
        :disable="submitBtnLoading"
        icon-right="arrow_right_alt"
        @click="submit"
      />

      <div class="login__forgot-pass">
        <router-link to="/password-reset" class="text-dark"
          >Forgot Password?</router-link
        >
      </div>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss" scoped>
@import '@/css/quasar.variables.scss';

.login__card {
  max-width: 580px;
  margin: 160px auto;
}

.login__actions--submit {
  width: 100%;
}

.login__section {
  padding-bottom: 0 !important;
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
      color: $primary !important;
    }
  }
}
</style>
