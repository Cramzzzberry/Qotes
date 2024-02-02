<script setup>
const model = defineModel()
</script>

<template>
  <Teleport to="body">
    <div
      :class="model ? 'visible' : 'invisible'"
      class="fixed left-0 top-0 z-20 h-svh w-screen transition-all duration-500"
    >
      <!-- backdrop -->
      <button
        @click="model = false"
        :class="model ? 'opacity-100' : 'opacity-0'"
        class="h-full w-full bg-gray-950/20 transition-opacity duration-500"
      ></button>

      <!-- panel -->
      <div
        :class="model ? 'translate-y-0' : 'translate-y-full'"
        class="absolute left-0 top-16 h-full w-full overflow-hidden rounded-t-3xl bg-gray-50 shadow-up transition-transform duration-500"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
