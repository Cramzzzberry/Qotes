<script setup>
import { computed, inject } from 'vue'

const toastStore = inject('toastStore')
const items = computed(() => {
  return toastStore.getItems()
})
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      tag="ul"
      name="toast"
      class="pointer-events-none fixed bottom-0 top-0 z-50 flex w-full min-w-0 flex-col items-center justify-start gap-1 py-4"
    >
      <li
        v-for="item in items"
        :key="item.id"
        class="w-[calc(100%-16px)] max-w-[540px] truncate rounded-xl bg-gray-950/90 p-4 text-gray-50 shadow-md backdrop-blur-xl"
      >
        {{ item.message }}
      </li>
    </TransitionGroup>
  </Teleport>
</template>
