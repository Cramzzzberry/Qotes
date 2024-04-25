<script setup>
const toggle = defineModel('toggle');
defineEmits(['confirm']);
const props = defineProps({
  title: String,
  description: String,
  confirmLabel: {
    type: String,
    default: 'Yes'
  },
  cancelLabel: {
    type: String,
    default: 'No'
  },
  confirmState: {
    type: String,
    default: 'success'
  },
  cancelState: {
    type: String,
    default: 'error'
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      :class="toggle ? 'visible' : 'invisible'"
      class="fixed left-0 top-0 z-20 flex h-svh w-screen items-center justify-center px-2 transition-all"
    >
      <!-- backdrop -->
      <div
        :class="toggle ? 'opacity-100' : 'opacity-0'"
        class="absolute left-0 top-0 h-full w-full bg-gray-950/20 transition-opacity"
      ></div>

      <!-- panel -->
      <div
        :class="toggle ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
        class="max-h-[calc(100svh-32px)] w-full max-w-[620px] space-y-2 overflow-hidden rounded-3xl bg-neutral-50 px-4 pb-3 pt-5 transition-all dark:bg-neutral-800"
      >
        <header class="flex flex-row items-center justify-between">
          <p class="text-xl font-medium leading-none">{{ props.title }}</p>
        </header>

        <p class="px-1">
          {{ props.description }}
        </p>

        <div class="flex flex-col gap-1 lg:flex-row-reverse">
          <AppButtonGhost
            @click="$emit('confirm')"
            :state="props.confirmState"
            size="sm"
            class="w-full lg:w-fit lg:px-4"
          >
            {{ props.confirmLabel }}
          </AppButtonGhost>
          <AppButtonGhost
            @click="toggle = false"
            :state="props.cancelState"
            size="sm"
            class="w-full lg:w-fit lg:px-4"
          >
            {{ props.cancelLabel }}
          </AppButtonGhost>
        </div>
      </div>
    </div>
  </Teleport>
</template>
