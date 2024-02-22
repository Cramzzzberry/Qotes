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
  <div class="flex flex-col gap-1 md:flex-row md:gap-2">
    <AppFormTextbox v-model="firstName" label="First Name" type="text" wide class="md:basis-1/2" />
    <AppFormTextbox v-model="lastName" label="Last Name" type="text" wide class="md:basis-1/2" />
  </div>
  <AppFormTextbox v-model="email" label="Email" placeholder="Your new email" type="email" />
  <AppButtonSolid
    @click="toggle = true"
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
    confirm-state="default"
    cancel-state="default"
  />
</template>
