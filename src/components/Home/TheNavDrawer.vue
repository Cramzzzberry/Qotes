<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useHomeTabStore, useDrawerStore } from '@/store'
import axios from 'axios'

const router = useRouter()

const fullName = ref(null)
const isLoading = ref(true)
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
      fullName.value = `${res.data.firstName} ${res.data.lastName}`
    })
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' })
      } else {
        toastStore.addToast(err.response.data, 3000)
      }
    })
    .finally(() => (isLoading.value = false))
})

function changeTab(index) {
  useHomeTabStore.setIndex(index)
  useDrawerStore.close()
}

function goToSettings() {
  useDrawerStore.close()
  router.push({ name: 'account settings' })
}
</script>

<template>
  <!-- main content -->
  <div class="h-svh overflow-hidden bg-gray-50">
    <slot />
  </div>

  <!-- drawer -->
  <div
    :class="useDrawerStore.state ? 'visible' : 'invisible'"
    class="fixed left-0 top-0 z-20 h-svh w-screen transition-all duration-500"
  >
    <!-- backdrop -->
    <button
      @click="useDrawerStore.close()"
      :class="useDrawerStore.state ? 'opacity-100' : 'opacity-0'"
      class="h-full w-full bg-gray-950/20 transition-opacity duration-500"
    ></button>

    <!-- panel -->
    <div
      :class="useDrawerStore.state ? 'translate-x-0' : '-translate-x-full'"
      class="absolute left-0 top-0 h-full w-5/6 overflow-hidden rounded-r-3xl bg-gray-50 p-2 drop-shadow-xl transition-transform duration-500"
    >
      <nav class="flex h-full w-full flex-col justify-between font-normal text-gray-950/40">
        <div class="grid auto-rows-auto gap-1 pt-12">
          <button
            @click="changeTab(0)"
            :class="useHomeTabStore.index === 0 ? 'text-emerald-500' : ''"
            class="group transition-colors"
          >
            <div
              class="relative flex w-full flex-row items-center gap-2 rounded-2xl px-2 py-3 transition-colors group-hover:bg-gray-950/10"
            >
              <span class="material-icons-round"> view_stream </span>
              <p>All</p>
            </div>
          </button>
          <button
            @click="changeTab(1)"
            :class="useHomeTabStore.index === 1 ? 'text-emerald-500' : ''"
            class="group transition-colors"
          >
            <div
              class="relative flex w-full flex-row items-center gap-2 rounded-2xl px-2 py-3 transition-colors group-hover:bg-gray-950/10"
            >
              <span class="material-icons-round"> push_pin </span>
              <p>Lineup</p>
            </div>
          </button>
          <button
            @click="changeTab(2)"
            :class="useHomeTabStore.index === 2 ? 'text-emerald-500' : ''"
            class="group transition-colors"
          >
            <div
              class="relative flex w-full flex-row items-center gap-2 rounded-2xl px-2 py-3 transition-colors group-hover:bg-gray-950/10"
            >
              <span class="material-icons-round"> emoji_objects </span>
              <p>Important</p>
            </div>
          </button>
        </div>

        <button @click="goToSettings()" class="group transition-colors">
          <div
            class="relative flex w-full flex-row items-center gap-2 rounded-2xl px-2 py-3 transition-colors group-hover:bg-gray-950/10"
          >
            <span class="material-icons-round"> settings </span>
            <p v-if="!isLoading">{{ fullName }}</p>
          </div>
        </button>
      </nav>
    </div>
  </div>
</template>
