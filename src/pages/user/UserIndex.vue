<script setup lang='ts'>
import { deleteUser, getUsers } from '@/api/users';
import { useQuasar } from 'quasar';


const q = useQuasar()
const router = useRouter()

type UserRow = {
  id: number
  email: string
  role: string[]
  username: string
  first_name: string
  last_name: string
}

const columns = [
  { name: 'id', label: '#', align: 'left', sortable: true, field: 'id' },
  { name: 'email', align: 'left', label: 'Email', field: 'email' },
  { name: 'role', label: 'Role', align: 'left', field: 'role' },
  { name: 'username', label: 'Username', align: 'left', field: 'username' },
  { name: 'first_name', label: 'First Name', align: 'left', field: 'first_name' },
  { name: 'last_name', label: 'Last Name', align: 'left', field: 'last_name' },
  { name: 'actions', label: 'Actions', align: 'left', style: 'width: 100px' }
] as any

const rows = ref<UserRow[]>([])
const loading = ref(true)
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 2,
  rowsPerPage: 5,
})

const userEdit = (user: UserRow) => {
  router.push({ name: 'User Edit', params: { userId: `${user.id}` } })
}

const fetchTable = async () => {
  rows.value = []
  loading.value = true
  try {
    const { data, meta } = await getUsers({ })
    if (data && data instanceof Array) {
      data.forEach(d => {
        rows.value.push({
          id: parseInt(d.id),
          email: d.attributes.email,
          role: d.attributes.role,
          username: d.attributes.username,
          first_name: d.attributes.first_name,
          last_name: d.attributes.last_name
        })
      })
    }

    pagination.value.rowsPerPage = meta.pagination.per_page
    toRaw(rows)
  } catch(err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

const userDelete = async (user: UserRow) => {
  await deleteUser(user.id)
  fetchTable()
}

onBeforeMount(() => {
  fetchTable()
})
</script>

<template>
  <div class='q-ma-md'>
    <q-table 
      class='user-table'
      title='Users'
      flat
      bordered
      :loading='loading'
      :grid='q.screen.xs'
      :columns='columns'
      :rows='rows'
      row-key='id'
      :pagination='pagination'
    >
      <template v-slot:body-cell-actions='{ row }'>
        <q-td>
          <q-btn-group flat>
            <q-btn label='Edit' icon='edit' size='sm' @click='userEdit(row)'></q-btn>
            <q-btn label='Delete' icon='delete' size='sm' @click='userDelete(row)'></q-btn>
          </q-btn-group>
        </q-td>
      </template>     
    </q-table>
  </div>
</template>
