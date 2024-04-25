<script setup>
import { useHomeTabStore, useGroupPreviewStore } from '@/store';
import TheNavDrawer from '@/components/Home/TheNavDrawer.vue';
import TheBottomPanel from '@/components/Home/TheBottomPanel.vue';
import ThePreviewSheets from '@/components/Home/ThePreviewSheets.vue';
import TabAll from '@/components/Home/Tabs/TabAll.vue';
import TabLineup from '@/components/Home/Tabs/TabLineup.vue';
import TabImportant from '@/components/Home/Tabs/TabImportant.vue';

const tabs = [TabLineup, TabImportant, TabAll];
</script>

<template>
  <TheNavDrawer>
    <Transition name="fade-up" mode="out-in">
      <KeepAlive>
        <component :is="tabs[useHomeTabStore.index]" />
      </KeepAlive>
    </Transition>
  </TheNavDrawer>

  <TheBottomPanel v-model="useGroupPreviewStore.state">
    <ThePreviewSheets />
  </TheBottomPanel>
</template>
