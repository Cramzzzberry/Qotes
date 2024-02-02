<script setup>
import axios from 'axios'
import { computed, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const toastStore = inject('toastStore')
const email = defineModel('email')
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
const router = useRouter()
const toggle = ref(false)
const isLoading = ref(false)

const isTextboxFilled = computed(() => {
  return email.value !== '' && firstName.value !== '' && lastName.value !== ''
})

async function updateDetails() {
  isLoading.value = true
  toggle.value = false
  await axios({
    method: 'put',
    url: `${import.meta.env.VITE_API_DOMAIN}/user/${localStorage.getItem('qotes_userID')}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    },
    data: {
      email: email.value,
      first_name: firstName.value,
      last_name: lastName.value
    }
  })
    .then(() => toastStore.addToast('User details updated', 3000))
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
  <AppFormTextbox
    v-model="email"
    state="info"
    label="Email"
    placeholder="Your new email"
    type="email"
  />
  <AppFormTextbox v-model="firstName" state="info" label="First Name" type="text" />
  <AppFormTextbox v-model="lastName" state="info" label="Last Name" type="text" />
  <AppButtonSolid
    @click="toggle = true"
    state="info"
    :is-loading="isLoading"
    :disabled="!isTextboxFilled || isLoading"
    wide
  >
    Update Details
  </AppButtonSolid>

  <AppDialog
    v-model:toggle="toggle"
    @confirm="updateDetails()"
    title="Update Details"
    description="Do you want to update your details?"
    confirm-state="info"
    cancel-state="default"
  />
</template>
