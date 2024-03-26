<script setup>
const model = defineModel();
const keys = ['All Keys', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
</script>

<template>
  <label class="group relative flex cursor-pointer flex-row items-center">
    <select
      v-model="model"
      class="cursor-pointer rounded-lg bg-gray-500/10 py-1 pl-3 pr-7 shadow-sm outline-none transition-colors group-focus-within:bg-gray-500/20 dark:bg-gray-300/10 dark:group-focus-within:bg-gray-300/20"
    >
      <option v-for="x in keys" :key="x" class="bg-gray-50 dark:bg-neutral-900">{{ x }}</option>
    </select>

    <span
      class="material-icons-round pointer-events-none absolute right-2 text-lg text-gray-500 transition-colors group-focus-within:text-gray-950 dark:text-gray-400 dark:group-focus-within:text-gray-50"
    >
      expand_more
    </span>
  </label>
</template>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
