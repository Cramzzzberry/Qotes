<script setup>
const props = defineProps({
  state: {
    type: String,
    default: 'default'
  }
});

const states = {
  default: 'text-doublemint-500 active:text-doublemint-600 disabled:text-doublemint-500/50',
  info: 'text-blue-500 active:text-blue-600 disabled:text-blue-500/50',
  warning: 'text-amber-500 active:text-amber-600 disabled:text-amber-500/50',
  success: 'text-emerald-500 active:text-emerald-600 disabled:text-emerald-500/50',
  error: 'text-red-500 active:text-red-600 disabled:text-red-500/50'
};
</script>

<template>
  <button class="font-normal" :class="states[props.state]">
    <slot />
  </button>
</template>
