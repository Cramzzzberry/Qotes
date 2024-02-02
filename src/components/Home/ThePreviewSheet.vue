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
}
</script>

<template>
  <div class="flex h-full flex-col">
    <header class="flex shrink-0 flex-row items-center bg-gray-50 px-4 pb-2 pt-4">
      <AppButtonGhostIcon @click="goEdit()" icon="edit_note" />
      <div class="flex grow flex-col items-center leading-none">
        <div v-if="isLoading" class="flex h-9 w-full items-center justify-center">
          <AppLoader />
        </div>
        <template v-else>
          <p class="font-normal">{{ sheet.songTitle }}</p>
          <p class="text-sm font-light">{{ sheet.artist }}</p>
        </template>
      </div>
      <AppButtonGhostIcon @click="usePreviewStore.close()" icon="close" />
    </header>

    <div v-if="isLoading" class="flex grow items-center justify-center">
      <AppLoader />
    </div>
    <div
      v-else
      v-html="clean"
      class="sheet-preview w-full overflow-auto whitespace-nowrap px-3 font-['Roboto_Mono']"
    ></div>
  </div>
</template>
