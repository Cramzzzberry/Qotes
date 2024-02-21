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
        :class="
          model
            ? 'translate-y-0 md:translate-x-0 md:translate-y-0'
            : 'translate-y-full md:translate-x-full md:translate-y-0'
        "
        class="absolute left-0 top-16 h-[calc(100%-4rem)] w-full overflow-hidden rounded-t-3xl bg-doublemint-50 transition-transform duration-500 md:left-auto md:right-0 md:top-0 md:h-full md:max-w-[720px] md:rounded-l-3xl md:rounded-tr-none"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
