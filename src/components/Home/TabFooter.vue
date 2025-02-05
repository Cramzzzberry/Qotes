<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import TheModalCreate from './TheModalCreate.vue';
import { useRefreshStore } from '@/store';
import { ref, inject } from 'vue';

const toastStore = inject('toastStore');
const selectionStore = inject('selectionStore');
const router = useRouter();
const isLoading = ref(false);

function refreshSheets() {
  useRefreshStore.refresh();
  selectionStore.items.value = [];
  selectionStore.isToggled.value = false;
}

async function addAsImportant() {
  isLoading.value = true;
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
        router.push({ name: 'entry' });
      } else {
        toastStore.addToast(err.response.data, 3000);
      }
    })
    .finally(() => {
      isLoading.value = false;
      refreshSheets();
    });
}

async function makeUnmportant() {
  isLoading.value = true;
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
        router.push({ name: 'entry' });
      } else {
        toastStore.addToast(err.response.data, 3000);
      }
    })
    .finally(() => {
      isLoading.value = false;
      refreshSheets();
    });
}

async function pinToLineup() {
  isLoading.value = true;
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
        router.push({ name: 'entry' });
      } else {
        toastStore.addToast(err.response.data, 3000);
      }
    })
    .finally(() => {
      isLoading.value = false;
      refreshSheets();
    });
}

async function unpinToLineup() {
  isLoading.value = true;
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
        router.push({ name: 'entry' });
      } else {
        toastStore.addToast(err.response.data, 3000);
      }
    })
    .finally(() => {
      isLoading.value = false;
      refreshSheets();
    });
}
</script>

<template>
  <div class="w-full shrink-0 bg-neutral-100 px-4 py-3 lg:px-16 dark:bg-neutral-800">
    <Transition name="fade-up" mode="out-in">
      <div v-if="!selectionStore.isToggled.value" class="flex flex-row items-center">
        <slot name="left-button">
          <div class="invisible h-6 w-6">Create</div>
        </slot>
        <p class="grow text-center text-sm font-normal">Qotes</p>
        <TheModalCreate />
      </div>

      <div
        v-else
        class="grid h-[26px] grid-cols-2 items-center gap-2 font-normal lg:flex lg:flex-row lg:justify-end lg:gap-16"
      >
        <template v-if="selectionStore.hasItems.value">
          <div class="text-left lg:text-center">
            <AppButtonText
              @click="addAsImportant()"
              :disabled="isLoading"
              v-if="!selectionStore.organizedItems.value.hasImportants"
            >
              Mark as Important
            </AppButtonText>
            <AppButtonText
              @click="makeUnmportant()"
              :disabled="isLoading"
              v-if="!selectionStore.organizedItems.value.noImportants"
            >
              Mark as Unimportant
            </AppButtonText>
          </div>

          <div class="text-right lg:text-center">
            <AppButtonText
              @click="pinToLineup()"
              :disabled="isLoading"
              v-if="!selectionStore.organizedItems.value.hasLineups"
            >
              Pin to Lineup
            </AppButtonText>
            <AppButtonText
              @click="unpinToLineup()"
              :disabled="isLoading"
              v-if="!selectionStore.organizedItems.value.noLineups"
            >
              Unpin from Lineup
            </AppButtonText>
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>
