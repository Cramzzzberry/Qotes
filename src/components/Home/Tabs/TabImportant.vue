<script setup>
import TabHeader from '../TabHeader.vue';
import TabFooter from '../TabFooter.vue';
import SheetList from '../SheetList.vue';
import { ref } from 'vue';
import { useScrollStore } from '@/store';

const search = ref('');
const filter = ref('All Keys');
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex grow flex-col overflow-y-scroll" ref="useScrollStore">
      <TabHeader v-model:search="search" v-model:filter="filter" heading="Important" />

      <div
        class="mx-2 mb-2 rounded-2xl bg-emerald-400 px-12 py-6 text-center font-normal text-emerald-950 lg:mx-16"
      >
        <p>Sheets that are used weekly</p>
      </div>

      <!-- sheet list -->
      <SheetList category="important" :search="search" :sheet-key="filter" />
    </div>

    <TabFooter />
  </div>
</template>
