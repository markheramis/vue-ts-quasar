<script setup lang='ts'>
import { createUser, getUserById, updateUser } from '@/api/users';


const props = defineProps({
  userId: {
    type: String,
    default: ''
  } 
})

const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  username: ''
})

const feedback = ref('')

const submit = async () => {
  if (!props.userId) {
    await createUser({ ...user.value }) 
  } else {
    await updateUser(parseInt(props.userId), { ...user.value })

    feedback.value = 'User updated...'
  }
}

onBeforeMount(async() => {
  if (props.userId) {
    const { data } = await getUserById(props.userId)

    const { first_name, last_name, email, username } = data.data

    user.value = { first_name, last_name, email, username }
  }
})

onBeforeUpdate(() => {
  console.log(props.userId)
})
</script>
<template>
  <q-card class='q-ma-md user-create__card'>
    <q-card-section>
      <q-form class="user-create__form" @submit.prevent='submit'>
        <q-input
          v-model='user.first_name'
          placeholder='First Name'
          autofocus
        />

        <q-input
          v-model='user.last_name'
          placeholder='Last Name'
        />

        <q-input
          v-model='user.email'
          placeholder='Email'
        />

        <q-input
          v-model='user.username'
          placeholder='Username'
        />
      </q-form>
    </q-card-section>

    <q-card-actions>
      <div 
        :visibility="feedback ? 'visible' : 'none'"
        class='user-create__feedback text-caption text-weight-light'
      >
        <q-icon v-show='feedback' name='warning_amber' class='q-pr-md' />
        {{ feedback }}
      </div>

      <q-btn
        :label="props.userId ? 'Update' : 'Submit'"
        color='primary'
        icon='save'
        @click='submit'
      ></q-btn>
      <q-btn
        v-if='!props.userId'
        label='Clear'
        icon='clear'
      ></q-btn>
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
</style>
