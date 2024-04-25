<script setup>
const selectedKey = defineModel('selectedKey');
const toggle = defineModel('toggle');
const songTitle = defineModel('songTitle');
const artist = defineModel('artist');

const keys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
</script>

<template>
  <header class="shrink-0 bg-neutral-50 pb-2 lg:px-14 dark:bg-neutral-900">
    <div class="shrink-0 place-self-start px-2 pb-2 pt-10">
      <AppButtonGhostIcon @click="$router.go(-1)" icon="arrow_back" />
    </div>

    <div class="flex flex-row items-center justify-between px-3">
      <div class="w-full">
        <input
          v-model="songTitle"
          type="text"
          class="w-full truncate bg-transparent text-3xl font-medium leading-none outline-1 outline-offset-2 outline-stone-400 dark:outline-stone-500"
        />
        <input
          v-model="artist"
          type="text"
          class="w-full truncate bg-transparent text-xl font-normal leading-none outline-1 outline-offset-2 outline-stone-400 dark:outline-stone-500"
        />
      </div>

      <div class="flex flex-row items-center gap-2">
        <div class="group relative flex cursor-pointer flex-row items-center gap-1">
          <span class="material-icons-round"> music_note </span>
          <select
            v-model="selectedKey"
            class="cursor-pointer rounded-lg bg-gray-500/10 py-1 pl-3 pr-7 shadow-sm outline-none transition-colors group-focus-within:bg-gray-500/20 dark:bg-gray-300/10 dark:group-focus-within:bg-gray-300/20"
          >
            <option v-for="x in keys" :key="x" class="bg-gray-50 dark:bg-neutral-900">
              {{ x }}
            </option>
          </select>

          <span
            class="material-icons-round pointer-events-none absolute right-2 text-lg text-gray-500 transition-colors group-focus-within:text-gray-950 dark:text-gray-400 dark:group-focus-within:text-gray-50"
          >
            expand_more
          </span>
        </div>

        <AppButtonGhostIcon @click="toggle = !toggle" :icon="toggle ? 'visibility' : 'edit'" />
      </div>
    </div>
  </header>
</template>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
