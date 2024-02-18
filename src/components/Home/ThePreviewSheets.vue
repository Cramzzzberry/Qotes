<script setup>
//TODO: Store the lineups on a localStorage and update the localStorage accordingly
import { useGroupPreviewStore, useRefreshStore } from '@/store'
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import draggable from 'vuedraggable'
import parseSheet from '@/scripts/parse-sheet'
import { debounce } from '@/scripts/debounce'

const router = useRouter()

const transitionOptions = {
  animation: 150,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost'
}

const songNumbers = ref([])
const orderedList = ref([])
const selectedSong = ref('Song 1')
const isLoading = ref(false)
const editSheetArrangement = ref(true)
const clean = ref(null)

const getLineups = debounce(() => {
  const onFetch = async () => {
    await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_DOMAIN}/sheets/lineup`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('qotes_token')}`,
        userID: localStorage.getItem('qotes_userID')
      }
    })
      .then((res) => { 
        if (res.data.length > 0) {
          //This is displayed on the dropdown
          songNumbers.value = res.data.map((e, index) => `Song ${index + 1}`)

          // Get the updated lineup and store the order as the fetched one
          if (localStorage.getItem('qotes_lineup') !== JSON.stringify(res.data)) {
            //This will be used to get the specific lineup
            //This is also used for ordering lineups
            orderedList.value = res.data.map((song, index) => {
              return {
                song,
                order: index + 1
              }
            })

            saveOrder()
            localStorage.setItem('qotes_lineup', JSON.stringify(res.data))
          } else {
            //Get the order from the stored version
            let list = JSON.parse(localStorage.getItem('qotes_ordered_lineup'))

            songNumbers.value = list.map((e, index) => `Song ${index + 1}`)
            orderedList.value = list.map((sheet) => {
              res.data.forEach((e) => {
                if (e.id === sheet.song.id) {
                  sheet.song.content = e.content
                }
              })
              return sheet
            })
          }

          setClean()
        } else {
          // Clean the stored version if there's no lineup
          // This is necessary because the ui components depends on the stored version
          orderedList.value = []
          clean.value = null
          localStorage.removeItem('qotes_ordered_lineup')
          localStorage.removeItem('qotes_lineup')
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          router.push({ name: 'entry' })
        } else {
          console.log(err)
        }
      })
      .finally(() => (isLoading.value = false))
  }

  onFetch()
})

onMounted(() => {
  //refresh when the sheet list is updated
  watch(
    () => useRefreshStore.toggle,
    () => {
      isLoading.value = true
      getLineups()
    },
    { immediate: true }
  )

  watch(
    () => useGroupPreviewStore.state,
    () => {
      if (useGroupPreviewStore.state) {
        isLoading.value = true
        getLineups()
      }

      editSheetArrangement.value = true
    },
    { immediate: true }
  )

  watch(
    () => selectedSong.value,
    () => {
      setClean()
    }
  )
})

function saveOrder() {
  localStorage.setItem('qotes_ordered_lineup', JSON.stringify(orderedList.value))
  setClean()
}

function setClean() {
  clean.value = parseSheet(
    orderedList.value[songNumbers.value.indexOf(selectedSong.value)].song.content
  )
}
</script>

<template>
  <div class="h-full overflow-y-auto">
    <div v-if="isLoading" class="flex h-full items-center justify-center">
      <AppLoader />
    </div>

    <template v-else-if="clean">
      <header class="sticky top-0 z-10 flex flex-row items-center bg-gray-50 px-4 pb-2 pt-4">
        <AppButtonGhostIcon
          @click="editSheetArrangement = !editSheetArrangement"
          :icon="!editSheetArrangement ? 'format_list_numbered' : 'arrow_back'"
        />
        <div class="flex grow flex-col items-center leading-none">
          <AppFormSelect
            v-if="!editSheetArrangement"
            v-model="selectedSong"
            :options="songNumbers"
          />
          <p v-else class="flex h-[34px] items-center font-normal lg:h-[38px]">Edit Order</p>
        </div>
        <AppButtonGhostIcon @click="useGroupPreviewStore.close()" icon="close" />
      </header>

      <Transition name="fade-down" mode="out-in">
        <div
          v-if="!editSheetArrangement"
          v-html="clean"
          class="sheet-preview w-full overflow-auto whitespace-nowrap px-3 py-2 font-['Roboto_Mono'] lg:px-6"
        ></div>
        <draggable
          v-else
          v-model="orderedList"
          v-bind="transitionOptions"
          @end="saveOrder()"
          tag="ul"
          handle=".handle"
          item-key="order"
          class="space-y-2 overflow-y-auto px-3"
        >
          <template #item="{ element }">
            <li
              class="flex flex-row items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <span class="material-icons-round handle cursor-move"> drag_handle </span>
              {{ element.song.songTitle }}
            </li>
          </template>
        </draggable>
      </Transition>
    </template>

    <div v-else class="flex h-full items-center justify-center">
      Create or Pin a sheet on lineup to preview
    </div>
  </div>
</template>

<style scoped>
.ghost {
  @apply border-gray-200 bg-gray-200 text-gray-200;
}
</style>
