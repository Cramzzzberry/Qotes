<script setup>
import { usePreviewStore, useRefreshStore } from '@/store'
import { onMounted, ref, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { debounce } from '@/scripts/debounce'

const props = defineProps({
  category: String,
  search: String,
  sheetKey: String
})

const listColors = {
  all: 'bg-emerald-300/10 hover:bg-emerald-300/25 hover:border-emerald-300',
  lineup: 'bg-blue-300/10 hover:bg-blue-300/25 hover:border-blue-300',
  important: 'bg-amber-300/10 hover:bg-amber-300/25 hover:border-amber-300'
}

const listActiveColors = {
  all: 'active:bg-emerald-300/15',
  lineup: 'active:bg-blue-300/15',
  important: 'active:bg-amber-300/15'
}

const keyColors = {
  all: 'bg-emerald-400 text-emerald-800',
  lineup: 'bg-blue-400 text-blue-950',
  important: 'bg-amber-300 text-amber-800'
}

const checkboxColors = {
  all: 'accent-emerald-400',
  lineup: 'accent-blue-400',
  important: 'accent-amber-400'
}

const toastStore = inject('toastStore')
const selectionStore = inject('selectionStore')
const router = useRouter()
const list = ref([])
const isLoading = ref(false)

const search = debounce(() => {
  const onFetch = async () => {
    await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_DOMAIN}/sheets/search/${props.category}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
        userID: localStorage.getItem('qotes_userID')
      },
      params: {
        search: props.search,
        key: props.sheetKey
      }
    })
      .then((res) => {
        list.value = res.data
      })
      .catch((err) => {
        if (err.response.status == 401) {
          router.push({ name: 'entry' })
        } else {
          toastStore.addToast(err.response.data, 3000)
        }
      })
      .finally(() => (isLoading.value = false))
  }

  onFetch()
})

onMounted(() => {
  watch(
    () => [props.search, props.sheetKey, useRefreshStore.toggle],
    () => {
      isLoading.value = true
      search()
    },
    { immediate: true }
  )
})

function preview(id) {
  usePreviewStore.open()

  //did this to prevent refetch
  if (id !== usePreviewStore.sheetID) {
    usePreviewStore.sheetID = id
  }
}
</script>

<template>
  <section v-if="!isLoading && list.length > 0" class="px-2 pb-2 lg:px-16">
    <ul class="grid grid-flow-row gap-2 md:grid-cols-2 xl:grid-cols-3">
      <li
        v-for="sheet in list"
        :key="sheet.id"
        :class="listColors[props.category]"
        class="flex max-h-20 flex-row overflow-hidden rounded-2xl border border-transparent transition-colors duration-75"
      >
        <!-- main button -->
        <button
          @click="preview(sheet.id)"
          :class="listActiveColors[props.category]"
          class="flex min-w-0 grow flex-row items-center text-start"
        >
          <span
            :class="keyColors[props.category]"
            class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-3xl font-medium leading-none"
          >
            {{ sheet.songKey }}
          </span>
          <div class="flex min-w-0 grow flex-col justify-center p-2 leading-none">
            <p class="truncate">{{ sheet.songTitle }}</p>
            <p class="truncate text-sm font-extralight">{{ sheet.artist }}</p>
            <div class="flex flex-row items-center gap-1 text-[0.75rem] font-light">
              <span
                v-if="sheet.important"
                class="rounded-full border border-amber-400 px-2 py-1 text-amber-600"
              >
                Important
              </span>
              <span
                v-if="sheet.lineup"
                class="rounded-full border border-blue-400 px-2 py-1 text-blue-600"
              >
                Lineup
              </span>
            </div>
          </div>
        </button>

        <!-- multiple select checkbox -->
        <label class="flex h-full w-10 shrink-0 cursor-pointer items-center justify-center">
          <input
            v-model="selectionStore.items.value"
            :value="`${sheet.id}---${sheet.important}---${sheet.lineup}`"
            type="checkbox"
            :class="checkboxColors[props.category]"
            class="relative cursor-pointer rounded-full before:absolute before:-bottom-5 before:-left-5 before:-right-5 before:-top-5 before:rounded-full before:content-null hover:enabled:before:bg-gray-400/20 active:enabled:before:bg-gray-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </label>
      </li>
    </ul>
  </section>

  <div
    v-else-if="!isLoading && list.length === 0"
    class="flex h-full w-full items-center justify-center"
  >
    No Sheets available
  </div>

  <div v-else class="flex h-full w-full items-center justify-center">
    <AppLoader />
  </div>
</template>
