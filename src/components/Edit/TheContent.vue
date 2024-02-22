<script setup>
import { computed } from 'vue'
import parseSheet from '@/scripts/parse-sheet'

const content = defineModel('content')
const preview = defineModel('preview')

const clean = computed(() => {
  console.log(content.value)
  return parseSheet(content.value)
})
</script>

<template>
  <textarea
    v-if="!preview"
    v-model="content"
    spellcheck="false"
    maxlength="5000"
    class="w-full grow resize-none overflow-auto whitespace-pre-wrap bg-transparent px-3 pb-4 font-['Roboto_Mono'] text-lg font-normal leading-[1.5] outline-none lg:px-16"
  ></textarea>

  <div
    v-else
    v-html="clean"
    class="sheet-preview w-full grow overflow-auto whitespace-nowrap px-3 pb-4 font-['Roboto_Mono'] font-normal lg:px-16"
  ></div>
</template>
