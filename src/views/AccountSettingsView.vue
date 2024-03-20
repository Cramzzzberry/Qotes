<script setup>
import SectionDetails from '@/components/AccountSettings/SectionDetails.vue';
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SectionDeleteAccount from '@/components/AccountSettings/SectionDeleteAccount.vue';

const toastStore = inject('toastStore');
const router = useRouter();

const currentAcc = ref({
  email: '',
  firstName: '',
  lastName: ''
});

onMounted(async () => {
  await axios({
    method: 'get',
    url: `${import.meta.env.VITE_API_DOMAIN}/user/${localStorage.getItem('qotes_userID')}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    }
  })
    .then((res) => {
      currentAcc.value.email = res.data.email;
      currentAcc.value.firstName = res.data.firstName;
      currentAcc.value.lastName = res.data.lastName;
    })
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' });
      } else {
        toastStore.addToast(err.response.data, 3000);
      }
    });
});

const isLoggingOut = ref(false);
async function logout() {
  isLoggingOut.value = true;
  await axios({
    method: 'delete',
    url: `${import.meta.env.VITE_API_DOMAIN}/user`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`
    }
  })
    .then(() => toastStore.addToast('Successfully logged out', 3000))
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' });
      } else {
        toastStore.addToast(err.response.data, 3000);
      }
    })
    .finally(() => {
      isLoggingOut.value = false;
      Object.keys(localStorage).forEach(function (key) {
        if (/^qotes_/.test(key)) {
          localStorage.removeItem(key);
        }
      });
      router.push({ name: 'entry' });
    });
}
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="w-full grow overflow-y-auto">
      <header class="sticky top-0 bg-doublemint-50 pb-2 lg:px-14">
        <div class="place-self-start px-2 pb-2 pt-10">
          <AppButtonGhostIcon @click="$router.go(-1)" icon="arrow_back" />
        </div>
        <div class="flex w-full flex-col px-3">
          <p class="text-3xl font-medium leading-none">Account Settings</p>
          <p>You can change your account details here</p>
        </div>
      </header>

      <div class="flex flex-col gap-1 px-2 pb-4 lg:px-16">
        <SectionDetails
          v-model:email="currentAcc.email"
          v-model:first-name="currentAcc.firstName"
          v-model:last-name="currentAcc.lastName"
        />

        <hr class="mx-2 my-4 border-gray-300" />

        <!-- delete account -->
        <SectionDeleteAccount />
      </div>
    </div>

    <div class="w-full shrink-0 p-2 lg:px-16">
      <AppButtonSolid @click="logout()" :is-loading="isLoggingOut" wide> Logout </AppButtonSolid>
    </div>
  </div>
</template>
