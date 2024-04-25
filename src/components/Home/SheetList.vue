<script setup>
import { useRefreshStore } from '@/store';
import { onMounted, ref, watch, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { debounce } from '@/scripts/debounce';
import { useScrollStore } from '@/store';

const props = defineProps({
  category: String,
  search: String,
  sheetKey: String
});

const toastStore = inject('toastStore');
const selectionStore = inject('selectionStore');
const router = useRouter();
const list = ref([]);
const isLoading = ref(false);
const cursor = ref(null);
const showMoreLoading = ref(true);
const showMoreLoadRef = ref(null);

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
        key: props.sheetKey,
        lastId: cursor.value
      }
    })
      .then((res) => {
        list.value.push(...res.data);

        if (res.data.length > 0) {
          cursor.value = res.data[res.data.length - 1].id;
        }

        if (res.data.length < 39) {
          showMoreLoading.value = false;
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          router.push({ name: 'entry' });
        } else {
          toastStore.addToast(err.response.data, 3000);
        }
      })
      .finally(() => (isLoading.value = false));
  };

  onFetch();
});

onMounted(() => {
  watch(
    () => [props.search, props.sheetKey, useRefreshStore.toggle],
    () => {
      list.value = [];
      isLoading.value = true;
      cursor.value = null;
      search();
    },
    { immediate: true }
  );

  //Scroll checking
  let ticking = false;
  useScrollStore.value.addEventListener('scroll', () => {
    let vpHeight = window.innerHeight;
    let showMoreLoadingRectY =
      showMoreLoadRef.value.getBoundingClientRect().top + showMoreLoadRef.value.offsetHeight / 2;
    let isVisible = showMoreLoadingRectY < vpHeight;
    if (isVisible && !ticking) {
      window.requestAnimationFrame(async () => {
        search();
        ticking = false;
      });
      ticking = true;
    }
  });
});
</script>

<template>
  <section v-if="!isLoading && list.length > 0" class="px-2 pb-2 lg:px-16">
    <ul class="grid grid-flow-row gap-2 md:grid-cols-2 xl:grid-cols-3">
      <li
        v-for="sheet in list"
        :key="sheet.id"
        class="flex max-h-20 flex-row overflow-hidden rounded-2xl border border-transparent bg-inlay-300/10 transition-colors duration-75 hover:bg-inlay-300/25"
      >
        <!-- main button -->
        <button
          @click="$router.push({ name: 'edit', params: { id: sheet.id } })"
          class="flex min-w-0 grow flex-row items-center text-start active:bg-inlay-300/30"
        >
          <span
            class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-doublemint-200 font-['Varela_Round'] text-3xl font-bold text-deadgreen-600"
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
            class="relative cursor-pointer rounded-full accent-inlay-500 before:absolute before:-bottom-5 before:-left-5 before:-right-5 before:-top-5 before:rounded-full before:content-null hover:enabled:before:bg-deadgreen-400/15 active:enabled:before:bg-deadgreen-400/25 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </label>
      </li>
    </ul>

    <div
      v-if="showMoreLoading"
      class="flex w-full items-center justify-center py-4"
      ref="showMoreLoadRef"
    >
      <AppLoader />
    </div>
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
