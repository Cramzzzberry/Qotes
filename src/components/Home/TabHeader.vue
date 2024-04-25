<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SelectKeys from './SelectKeys.vue';
import { useRefreshStore, useDrawerStore } from '@/store';

const toastStore = inject('toastStore');
const selectionStore = inject('selectionStore');
const search = defineModel('search', { required: true });
const filter = defineModel('filter', { default: 'All Keys', required: true });

const props = defineProps({
  heading: String
});

const router = useRouter();
const toggle = ref(false);
const isLoading = ref(false);
async function deleteSheets() {
  isLoading.value = true;
  toggle.value = false;
  await axios({
    method: 'delete',
    url: `${import.meta.env.VITE_API_DOMAIN}/sheets`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    },
    data: {
      ids: selectionStore.organizedItems.value.ids
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
      selectionStore.isToggled.value = false;
      useRefreshStore.refresh();
    });
}
</script>

<template>
  <header class="sticky top-0 z-10 bg-neutral-50 pb-2 lg:px-14 dark:bg-neutral-900">
    <div class="shrink-0 place-self-start px-2 pb-2 pt-10">
      <AppButtonGhostIcon @click="useDrawerStore.open()" icon="menu" />
    </div>

    <div class="flex w-full flex-col gap-2">
      <Transition name="fade-down" mode="out-in">
        <p v-if="!selectionStore.isToggled.value" class="px-3 text-3xl font-medium leading-none">
          {{ props.heading }}
        </p>
        <div v-else class="flex flex-row items-center justify-between pl-2 pr-3">
          <div class="flex flex-row items-center gap-1">
            <AppButtonGhostIcon @click="selectionStore.isToggled.value = false" icon="clear" />
            <p class="text-3xl font-medium leading-none">Selected {{ selectionStore.getLength }}</p>
          </div>

          <AppButtonGhostIcon
            @click="toggle = true"
            state="error"
            icon="delete"
            :is-loading="isLoading"
            :disabled="!selectionStore.hasItems.value || isLoading"
          />
        </div>
      </Transition>

      <div class="flex flex-row items-center gap-1 px-2">
        <label
          class="group flex w-full select-none flex-row items-center gap-1 rounded-lg bg-gray-500/10 pl-2 pr-3 transition-colors focus-within:bg-gray-500/20 dark:bg-gray-300/10 dark:focus-within:bg-gray-300/20"
        >
          <span
            class="material-icons-round text-lg text-gray-500 transition-colors group-focus-within:text-gray-950 dark:text-gray-400 dark:group-focus-within:text-gray-50"
          >
            search
          </span>
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            class="w-full truncate bg-transparent py-1 placeholder-gray-500 outline-none"
          />
        </label>

        <SelectKeys v-model="filter" />
      </div>
    </div>

    <AppDialog
      v-model:toggle="toggle"
      @confirm="deleteSheets()"
      title="Delete Sheets"
      :description="`Do you want to delete ${selectionStore.getLength.value} ${selectionStore.getLength.value > 1 ? 'sheets' : 'sheet'}?`"
      confirm-state="error"
      cancel-state="default"
    />
  </header>
</template>
