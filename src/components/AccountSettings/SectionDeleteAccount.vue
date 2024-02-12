<script setup>
import axios from 'axios'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const toastStore = inject('toastStore')
const router = useRouter()
const toggle = ref(false)
const isLoading = ref(false)

async function deleteAccount() {
  isLoading.value = true
  toggle.value = false
  await axios({
    method: 'delete',
    url: `${import.meta.env.VITE_API_DOMAIN}/user/${localStorage.getItem('qotes_userID')}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`
    }
  })
    .then(() => {
      Object.keys(localStorage).forEach(function (key) {
        if (/^qotes_/.test(key)) {
          localStorage.removeItem(key)
        }
      })
      router.push({ name: 'entry' })
      toastStore.addToast('Account Deleted', 3000)
    })
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' })
      } else {
        toastStore.addToast(err.response.data, 3000)
      }
    })
    .finally(() => (isLoading.value = false))
}
</script>

<template>
  <AppButtonSolid @click="toggle = true" state="error" :is-loading="isLoading" wide
    >Delete Account</AppButtonSolid
  >
  <p class="flex flex-row items-center justify-center gap-2 text-gray-500">
    <span class="material-icons-round"> warning </span>
    This will delete all your related data except the sheets you created
  </p>

  <AppDialog
    v-model:toggle="toggle"
    @confirm="deleteAccount()"
    title="Account Deletion"
    description="Are you sure you want to delete your account?"
    confirm-state="error"
    cancel-state="default"
  />
</template>
