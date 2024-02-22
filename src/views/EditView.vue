<script setup>
import TheHeader from '@/components/Edit/TheHeader.vue'
import TheContent from '@/components/Edit/TheContent.vue'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import changeKey from '@/scripts/change-key'
import axios from 'axios'

const toastStore = inject('toastStore')
const route = useRoute()
const router = useRouter()
const preview = ref(false)
const sheet = ref({
  songTitle: '',
  artist: '',
  key: '',
  content: ''
})

const contentLength = computed(() => sheet.value.content.length)

//fetch on mount
const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true
  await axios({
    method: 'get',
    url: `${import.meta.env.VITE_API_DOMAIN}/sheets/${route.params.id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    }
  })
    .then((res) => {
      sheet.value.songTitle = res.data.songTitle
      sheet.value.artist = res.data.artist
      sheet.value.content = res.data.content
      sheet.value.key = res.data.songKey

      watch(
        () => sheet.value.key,
        (newKey, oldKey) => {
          sheet.value.content = changeKey(sheet.value.content, newKey, oldKey)
        }
      )
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

const isSaving = ref(false)
async function saveSheet() {
  isSaving.value = true
  await axios({
    method: 'put',
    url: `${import.meta.env.VITE_API_DOMAIN}/sheets/${route.params.id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    },
    data: {
      songTitle: sheet.value.songTitle,
      artist: sheet.value.artist,
      songKey: sheet.value.key,
      content: sheet.value.content
    }
  })
    .then(() => toastStore.addToast('Sheet saved', 3000))
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' })
      } else {
        toastStore.addToast(err.response.data, 3000)
      }
    })
    .finally(() => (isSaving.value = false))
}
</script>

<template>
  <div v-if="isLoading" class="flex h-svh items-center justify-center">
    <AppLoader />
  </div>
  <div v-else class="flex h-svh flex-col">
    <TheHeader
      v-model:song-title="sheet.songTitle"
      v-model:artist="sheet.artist"
      v-model:selected-key="sheet.key"
      v-model:toggle="preview"
    />

    <TheContent v-model:content="sheet.content" v-model:preview="preview" />

    <!-- the footer -->
    <div class="w-full shrink-0 bg-doublemint-100 px-4 py-3 lg:px-16">
      <div class="flex flex-row items-center justify-end">
        <div class="invisible h-6 w-6">Create</div>
        <p class="grow text-center text-sm font-normal">{{ contentLength }} of 5000</p>
        <AppButtonGhostIcon @click="saveSheet()" icon="save" :is-loading="isSaving" />
      </div>
    </div>
  </div>
</template>
