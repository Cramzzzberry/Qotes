<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRefreshStore, useHomeTabStore } from '@/store'
import axios from 'axios'

const toastStore = inject('toastStore')
const router = useRouter()

const modal = ref({
  toggle: false,
  open() {
    this.toggle = true
  },
  close() {
    this.toggle = false
  }
})

const keys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']
const isLoading = ref(false)
const createSheet = ref({
  songTitle: '',
  artist: '',
  selectedKey: 'C',
  lineup: useHomeTabStore.index === 0 ? true : false,
  important: useHomeTabStore.index === 1 ? true : false
})

async function submit() {
  isLoading.value = true
  await axios({
    method: 'post',
    url: `${import.meta.env.VITE_API_DOMAIN}/sheets`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    },
    data: {
      songTitle: createSheet.value.songTitle,
      artist: createSheet.value.artist,
      songKey: createSheet.value.selectedKey,
      lineup: createSheet.value.lineup,
      important: createSheet.value.important
    }
  })
    .then(() => {
      toastStore.addToast('Sheet created', 3000)
      createSheet.value = {
        songTitle: '',
        artist: '',
        selectedKey: 'C',
        lineup: useHomeTabStore.index === 0 ? true : false,
        important: useHomeTabStore.index === 1 ? true : false
      }
    })
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' })
      } else {
        toastStore.addToast(err.response.data, 3000)
      }
    })
    .finally(() => {
      isLoading.value = false
      useRefreshStore.refresh()
    })
}
</script>

<template>
  <AppButtonGhostIcon @click="modal.open()" icon="edit" class="shrink-0" />

  <Teleport to="body">
    <div
      :class="modal.toggle ? 'visible' : 'invisible'"
      class="fixed left-0 top-0 z-20 flex h-svh w-screen items-center justify-center px-2 transition-all"
    >
      <!-- backdrop -->
      <div
        :class="modal.toggle ? 'opacity-100' : 'opacity-0'"
        class="absolute left-0 top-0 h-full w-full bg-gray-950/20 transition-opacity"
      ></div>

      <!-- panel -->
      <div
        :class="modal.toggle ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
        class="max-h-[calc(100svh-32px)] w-full max-w-[720px] space-y-2 overflow-hidden rounded-3xl bg-gray-50 p-3 drop-shadow-xl transition-all"
      >
        <header class="flex flex-row items-center justify-between p-1">
          <p class="text-xl font-medium leading-none">Create Sheet</p>
          <AppButtonGhostIcon @click="modal.close()" icon="close" />
        </header>

        <form @submit.prevent="submit()" class="h-full overflow-y-auto">
          <div class="mb-1 space-y-1">
            <div class="flex flex-col gap-1 md:flex-row md:gap-2">
              <AppFormTextbox
                v-model="createSheet.songTitle"
                label="Title"
                type="text"
                class="w-full"
                required
              />
              <AppFormTextbox
                v-model="createSheet.artist"
                label="Artist"
                type="text"
                class="w-full"
                required
              />
            </div>
            <AppFormSelect v-model="createSheet.selectedKey" label="Key" :options="keys" wide />
            <div class="flex flex-row gap-1">
              <label
                class="flex cursor-pointer flex-row items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-400/20 active:bg-gray-500/20"
              >
                <input
                  v-model="createSheet.lineup"
                  type="checkbox"
                  class="cursor-pointer accent-gray-200"
                />
                <p class="pointer-events-none pb-[2px]">Lineup</p>
              </label>
              <label
                class="flex cursor-pointer flex-row items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-400/20 active:bg-gray-500/20"
              >
                <input
                  v-model="createSheet.important"
                  type="checkbox"
                  class="cursor-pointer accent-gray-200"
                />
                <p class="pointer-events-none pb-[2px]">Important</p>
              </label>
            </div>
          </div>
          <AppButtonSolid :is-loading="isLoading" wide>Create</AppButtonSolid>
        </form>
      </div>
    </div>
  </Teleport>
</template>
