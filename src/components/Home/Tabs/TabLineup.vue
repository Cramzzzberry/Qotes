<script setup>
import TabHeader from '../TabHeader.vue'
import TabFooter from '../TabFooter.vue'
import SheetList from '../SheetList.vue'
import { ref } from 'vue'
import { useGroupPreviewStore, useScrollStore } from '@/store'

const search = ref('')
const filter = ref('All Keys')
const lineup = ref(false)
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex grow flex-col overflow-y-scroll" ref="useScrollStore">
      <TabHeader v-model:search="search" v-model:filter="filter" heading="Lineup" />

      <div
        class="mx-2 mb-2 rounded-2xl bg-deadgreen-400 px-12 py-6 text-center font-normal text-inlay-50 lg:mx-16"
      >
        <p>Where you pin all sheets that's considered as part of the current lineup</p>
      </div>

      <!-- sheet list -->
      <SheetList category="lineup" :search="search" :sheet-key="filter" />
    </div>

    <TabFooter>
      <template #left-button>
        <AppButtonGhostIcon
          @click="useGroupPreviewStore.open()"
          icon="visibility"
          :disabled="lineup.length === 0"
        />
      </template>
    </TabFooter>
  </div>
</template>
