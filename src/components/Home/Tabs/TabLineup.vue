<script setup>
import TabHeader from '../TabHeader.vue'
import TabFooter from '../TabFooter.vue'
import SheetList from '../SheetList.vue'
import { ref } from 'vue'
import { useGroupPreviewStore } from '@/store'

const search = ref('')
const filter = ref('All Keys')
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex grow flex-col overflow-y-scroll">
      <TabHeader v-model:search="search" v-model:filter="filter" heading="Lineup" />

      <div
        class="mx-2 mb-2 rounded-2xl bg-gradient-to-t from-amber-400 to-amber-300 px-12 py-6 text-center font-normal text-amber-950 shadow-md"
      >
        <p>Where you pin all sheets that's considered as a part of the current lineup</p>
      </div>

      <!-- sheet list -->
      <SheetList category="lineup" :search="search" :sheet-key="filter" />
    </div>

    <TabFooter>
      <template #left-button>
        <AppButtonGhostIcon @click="useGroupPreviewStore.open()" icon="visibility" />
      </template>
    </TabFooter>
  </div>
</template>
