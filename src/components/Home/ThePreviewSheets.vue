<script setup>
import { useGroupPreviewStore } from '@/store'
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'

const drag = ref(false)
const transitionOptions = {
  animation: 150,
  group: 'description',
  disabled: false,
  ghostClass: 'opacity-0'
}

const songList = ['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5', 'Song 6', 'Song 7', 'Song 8']
const orderedList = ref(
  songList.map((name, index) => {
    return {
      name,
      order: index + 1
    }
  })
)

const selectedSong = ref('Song 1')
const editSheetArrangement = ref(false)
const isLoading = ref(false)

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
        <AppFormSelect v-if="!editSheetArrangement" v-model="selectedSong" :options="songList" />
        <p v-else class="flex h-[34px] items-center font-normal">Edit Order</p>
      </div>
      <AppButtonGhostIcon @click="close()" icon="close" />
    </header>

    <div v-if="isLoading" class="flex grow items-center justify-center">
      <AppLoader />
    </div>

    <template v-else>
      <div
        v-if="!editSheetArrangement"
        class="sheet-preview w-full overflow-auto whitespace-nowrap px-3 font-['Roboto_Mono']"
      ></div>

      <draggable
        v-else
        v-model="orderedList"
        v-bind="transitionOptions"
        @start="drag = true"
        @end="drag = false"
        tag="ul"
        handle=".handle"
        item-key="order"
        class="space-y-2 overflow-y-auto px-3"
      >
        <template #item="{ element }">
          <li class="flex flex-row gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <span class="material-icons-round handle cursor-move"> drag_handle </span>
            {{ element.name }}
          </li>
        </template>
      </draggable>
    </template>
  </div>
</template>
