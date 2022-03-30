<script setup lang="ts">
import { createUser, getUserById, updateUser } from '@/api/users'
import { QForm, useQuasar } from 'quasar'
import {
  firstNameRules,
  lastNameRules,
  emailRules,
  usernameRules,
  passwordRules,
  userDefault,
} from './UserCreate'


/**
 * The user id passed as component props
 */

const props = defineProps({
  userId: {
    type: String,
    default: '',
  },
})

/**
 * Define router and quasar instances
 */

const router = useRouter()
const q = useQuasar()

/**
 * Component variables for v-bind directive
 */

const user = ref<
  Omit<typeof userDefault, 'password'> &
  Partial<Pick<typeof userDefault, 'password'>>
>(userDefault)
const userForm = ref<QForm | null>(null)
const feedback = ref('')
const isEdit = ref(false)
const showPwd = ref(false)

/**
 * Local methods
 */

const submit = async () => {
  const validate = await userForm.value?.validate()

  if (!validate) return

  let message = ''
  if (!props.userId || !isEdit.value) {
    await createUser({ ...user.value })
    message = 'User Created'
  } else {
    await updateUser(parseInt(props.userId), { ...user.value })
    message = 'User Updated'
  }

  q.notify({
    color: 'secondary',
    textColor: 'white',
    message: message,
    icon: 'check',
    position: 'top',
    timeout: 2500,
  })
}

const reset = () => {
  user.value = { ...userDefault }
  userForm.value?.reset()
}

/**
 * Watch userId prop changes and act accordingly, as this
 * component is used on both edit and create.
 */

watchEffect(async () => {
  if (!props.userId) {
    isEdit.value = false

    reset()
  } else {
    isEdit.value = true
    try {
      const { data } = await getUserById(props.userId)

      const { first_name, last_name, email, username } = data.data.data

      user.value = { first_name, last_name, email, username }
    } catch (err) {
      isEdit.value = false
      router.push('/user/create')
    }
  }
})
</script>
<template>
  <q-card class="q-ma-md user-create__card">
    <q-card-section>
      <q-form
        ref="userForm"
        class="user-create__form"
        @submit.prevent="submit"
        @keyup.enter="submit"
      >
        <q-input
          v-model="user.first_name"
          label="First Name"
          :rules="firstNameRules"
          autofocus
        />

        <q-input
          v-model="user.last_name"
          label="Last Name"
          :rules="lastNameRules"
        />

        <q-input
          v-model="user.email"
          label="Email"
          type="email"
          :rules="emailRules"
        />

        <q-input
          v-model="user.username"
          label="Username"
          :rules="usernameRules"
        />

        <q-input
          v-if="!isEdit"
          v-model="user.password"
          label="Password"
          :type="showPwd ? 'text' : 'password'"
          :rules="passwordRules"
        >
          <template #append>
            <q-icon
              :name="showPwd ? 'visibility_off' : 'visibility'"
              class="user-create__show-pwd"
              @click="showPwd = !showPwd"
            />
          </template>
        </q-input>
      </q-form>
    </q-card-section>

    <q-card-actions>
      <div
        :visibility="feedback ? 'visible' : 'none'"
        class="user-create__feedback text-caption text-weight-light"
      >
        <q-icon v-show="feedback" name="warning_amber" class="q-pr-md" />
        {{ feedback }}
      </div>

      <q-btn
        :label="isEdit ? 'Update' : 'Submit'"
        color="primary"
        :icon="isEdit ? 'save_as' : 'save'"
        @click="submit"
      ></q-btn>
      <q-btn v-if="!isEdit" label="Clear" icon="clear" @click="reset"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<style lang="scss">
.user-create__card {
  max-width: 800px;
}

.user-create__feedback {
  height: 1rem;
  width: 100%;
  color: $primary;
  margin-top: 10px;
  clear: both;
  margin-bottom: 20px;
}

.user-create__show-pwd {
  cursor: pointer;
}
</style>
