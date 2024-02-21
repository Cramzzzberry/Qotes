<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePreviewStore } from '@/store'
import parseSheet from '@/scripts/parse-sheet'
import axios from 'axios'

const router = useRouter()

const sheet = ref({
  songTitle: '',
  artist: '',
  songKey: '',
  content: ''
})

const isLoading = ref(false)

watch(
  () => usePreviewStore.state,
  () => {
    if (usePreviewStore.state) {
      isLoading.value = true
      axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_DOMAIN}/sheets/${usePreviewStore.sheetID}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
          userID: localStorage.getItem('qotes_userID')
        }
      })
        .then((res) => {
          sheet.value = res.data
        })
        .catch((err) => console.log(err))
        .finally(() => (isLoading.value = false))
    }
  }
)

const clean = computed(() => {
  return parseSheet(sheet.value.content)
})

function goEdit() {
  usePreviewStore.close()
  router.push({ name: 'edit', params: { id: usePreviewStore.sheetID } })
  usePreviewStore.sheetID = ''
}
</script>

<template>
  <div class="h-full overflow-y-auto">
    <header class="sticky top-0 z-10 flex flex-row items-center bg-doublemint-50 px-4 pb-2 pt-4">
      <div class="flex basis-1/3 justify-start">
        <AppButtonGhostIcon @click="goEdit()" icon="edit_note" />
      </div>
      <div class="flex min-w-0 grow flex-col text-center leading-none">
        <div v-if="isLoading" class="flex h-9 w-full items-center justify-center">
          <AppLoader />
        </div>
        <template v-else>
          <p class="truncate font-normal">{{ sheet.songTitle }}</p>
          <p class="truncate text-sm font-light">{{ sheet.artist }}</p>
        </template>
      </div>
      <div class="flex basis-1/3 justify-end">
        <AppButtonGhostIcon @click="usePreviewStore.close()" icon="close" />
      </div>
    </header>

    <div v-if="isLoading" class="flex h-full items-center justify-center">
      <AppLoader />
    </div>
    <div
      v-else
      v-html="clean"
      class="sheet-preview w-full overflow-auto whitespace-nowrap px-3 py-2 font-['Roboto_Mono'] lg:px-6"
    ></div>
  </div>
</template>
