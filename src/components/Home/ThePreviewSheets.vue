<script setup>
//TODO: Store the lineups on a localStorage and update the localStorage accordingly
import { useGroupPreviewStore } from '@/store'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import draggable from 'vuedraggable'
import parseSheet from '@/scripts/parse-sheet'

const router = useRouter()

const transitionOptions = {
  animation: 150,
  group: 'description',
  disabled: false,
  ghostClass: 'opacity-0'
}

const songNumbers = ref([])
const orderedList = ref([])
const selectedSong = ref('Song 1')
const isLoading = ref(true)
const editSheetArrangement = ref(false)

onMounted(async () => {
  await axios({
    method: 'get',
    url: `${import.meta.env.VITE_API_DOMAIN}/sheets/lineups`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
      userID: localStorage.getItem('qotes_userID')
    }
  })
    .then((res) => {
      //This is displayed on the dropdown
      songNumbers.value = res.data.map((e, index) => `Song ${index + 1}`)

      //This will be used to get the specific lineup
      //This is also used for ordering lineups
      orderedList.value = res.data.map((song, index) => {
        return {
          song,
          order: index + 1
        }
      })
    })
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'entry' })
      } else {
        console.log(err)
      }
    })
    .finally(() => (isLoading.value = false))
})

function close() {
  editSheetArrangement.value = false
  useGroupPreviewStore.close()
}
</script>

<template>
  <div class="flex h-full flex-col">
    <header class="flex shrink-0 flex-row items-center bg-gray-50 px-4 pb-2 pt-4">
      <AppButtonGhostIcon
        @click="editSheetArrangement = !editSheetArrangement"
        :icon="!editSheetArrangement ? 'format_list_numbered' : 'arrow_back'"
      />
      <div class="flex grow flex-col items-center leading-none">
        <div v-if="isLoading" class="flex h-9 w-full items-center justify-center">
          <AppLoader />
        </div>
        <AppFormSelect v-if="!editSheetArrangement" v-model="selectedSong" :options="songNumbers" />
        <p v-else class="flex h-[34px] items-center font-normal">Edit Order</p>
      </div>
      <AppButtonGhostIcon @click="close()" icon="close" />
    </header>

    <div v-if="isLoading" class="flex grow items-center justify-center">
      <AppLoader />
    </div>

    <Transition v-else name="fade-down" mode="out-in">
      <div
        v-if="!editSheetArrangement"
        v-html="parseSheet(orderedList[songNumbers.indexOf(selectedSong)].song.content)"
        class="sheet-preview w-full overflow-auto whitespace-nowrap px-3 font-['Roboto_Mono']"
      ></div>

      <draggable
        v-else
        v-model="orderedList"
        v-bind="transitionOptions"
        tag="ul"
        handle=".handle"
        item-key="order"
        class="space-y-2 overflow-y-auto px-3"
      >
        <template #item="{ element }">
          <li class="flex flex-row gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <span class="material-icons-round handle cursor-move"> drag_handle </span>
            {{ element.song.songTitle }}
          </li>
        </template>
      </draggable>
    </Transition>
  </div>
</template>
