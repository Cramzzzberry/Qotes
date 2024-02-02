<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import TheModalCreate from './TheModalCreate.vue'
import { useRefreshStore } from '@/store'
import { inject } from 'vue'

const toastStore = inject('toastStore')
const selectionStore = inject('selectionStore')
const router = useRouter()

function refreshSheets() {
  useRefreshStore.refresh()
  selectionStore.items.value = []
  selectionStore.isToggled.value = false
}

async function addAsImportant() {
  await axios({
    method: 'put',
    url: `${import.meta.env.VITE_API_DOMAIN}/sheets`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    },
    data: {
      ids: selectionStore.organizedItems.value.ids,
      data: {
        important: true
      }
    }
  })
    .then((res) => toastStore.addToast(res.data, 3000))
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' })
      } else {
        toastStore.addToast(err.response.data, 3000)
      }
    })
    .finally(() => refreshSheets())
}

async function makeUnmportant() {
  await axios({
    method: 'put',
    url: `${import.meta.env.VITE_API_DOMAIN}/sheets`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    },
    data: {
      ids: selectionStore.organizedItems.value.ids,
      data: {
        important: false
      }
    }
  })
    .then((res) => toastStore.addToast(res.data, 3000))
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' })
      } else {
        toastStore.addToast(err.response.data, 3000)
      }
    })
    .finally(() => refreshSheets())
}

async function pinToLineup() {
  await axios({
    method: 'put',
    url: `${import.meta.env.VITE_API_DOMAIN}/sheets`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    },
    data: {
      ids: selectionStore.organizedItems.value.ids,
      data: {
        lineup: true
      }
    }
  })
    .then((res) => toastStore.addToast(res.data, 3000))
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' })
      } else {
        toastStore.addToast(err.response.data, 3000)
      }
    })
    .finally(() => refreshSheets())
}

async function unpinToLineup() {
  await axios({
    method: 'put',
    url: `${import.meta.env.VITE_API_DOMAIN}/sheets`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    },
    data: {
      ids: selectionStore.organizedItems.value.ids,
      data: {
        lineup: false
      }
    }
  })
    .then((res) => toastStore.addToast(res.data, 3000))
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' })
      } else {
        toastStore.addToast(err.response.data, 3000)
      }
    })
    .finally(() => refreshSheets())
}
</script>

<template>
  <div class="w-full shrink-0 border-t border-t-gray-200 px-4 py-3">
    <Transition name="fade-up" mode="out-in">
      <div v-if="!selectionStore.isToggled.value" class="flex flex-row items-center">
        <slot name="left-button">
          <div class="invisible h-6 w-6">Create</div>
        </slot>
        <p class="grow text-center text-sm font-normal">25 Sheets</p>
        <TheModalCreate />
      </div>

      <div v-else class="grid h-[26px] grid-cols-2 items-center gap-2 font-normal">
        <template v-if="selectionStore.hasItems.value">
          <div class="text-left">
            <AppButtonText
              @click="addAsImportant()"
              v-if="!selectionStore.organizedItems.value.hasImportants"
            >
              Add as Important
            </AppButtonText>
            <AppButtonText
              @click="makeUnmportant()"
              v-if="!selectionStore.organizedItems.value.noImportants"
            >
              Make unimportant
            </AppButtonText>
          </div>

          <div class="text-right">
            <AppButtonText
              @click="pinToLineup()"
              v-if="!selectionStore.organizedItems.value.hasLineups"
            >
              Pin to Lineup
            </AppButtonText>
            <AppButtonText
              @click="unpinToLineup()"
              v-if="!selectionStore.organizedItems.value.noLineups"
            >
              Unpin to Lineup
            </AppButtonText>
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>
