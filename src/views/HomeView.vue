<script setup>
import { useHomeTabStore, usePreviewStore, useGroupPreviewStore } from '@/store'
import TheNavDrawer from '@/components/Home/TheNavDrawer.vue'
import TheSlidingPanel from '@/components/Home/TheSlidingPanel.vue'
import ThePreviewSheet from '@/components/Home/ThePreviewSheet.vue'
import ThePreviewSheets from '@/components/Home/ThePreviewSheets.vue'
import TabAll from '@/components/Home/Tabs/TabAll.vue'
import TabLineup from '@/components/Home/Tabs/TabLineup.vue'
import TabImportant from '@/components/Home/Tabs/TabImportant.vue'

const tabs = [TabLineup, TabImportant, TabAll]
</script>

<template>
  <TheNavDrawer>
    <Transition name="fade-up" mode="out-in">
      <KeepAlive>
        <component :is="tabs[useHomeTabStore.index]" />
      </KeepAlive>
    </Transition>
  </TheNavDrawer>

  <TheSlidingPanel v-model="usePreviewStore.state">
    <ThePreviewSheet />
  </TheSlidingPanel>

  <TheSlidingPanel v-model="useGroupPreviewStore.state">
    <ThePreviewSheets />
  </TheSlidingPanel>
</template>
