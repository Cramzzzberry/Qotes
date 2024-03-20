<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'base'
  },
  state: {
    type: String,
    default: 'default'
  },
  icon: {
    type: String,
    default: null
  },
  isLoading: Boolean
});

const states = {
  default: 'text-deadgreen-700',
  info: 'text-blue-400',
  warning: 'text-amber-400',
  success: 'text-emerald-400',
  error: 'text-red-400'
};

const btnSizes = {
  sm: 'before:-bottom-1 before:-left-1 before:-right-1 before:-top-1',
  base: 'before:-bottom-3 before:-left-3 before:-right-3 before:-top-3',
  lg: 'before:-bottom-5 before:-left-5 before:-right-5 before:-top-5'
};

const iconSizes = {
  sm: 'text-base leading-none',
  base: 'text-2xl leading-none',
  lg: 'text-4xl leading-none'
};

const loaderSizes = {
  sm: '16px',
  base: '24px',
  lg: '36px'
};
</script>

<template>
  <button
    :disabled="props.isLoading"
    :class="[states[props.state], btnSizes[props.size]]"
    class="relative flex select-none items-center justify-center rounded-full border border-transparent bg-transparent outline-none before:absolute before:rounded-full before:content-null hover:enabled:before:bg-deadgreen-400/15 active:enabled:before:bg-deadgreen-400/25 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <AppLoader v-if="props.isLoading" :size="loaderSizes[props.size]" />
    <span v-else :class="iconSizes[props.size]" class="material-icons-round">
      {{ props.icon }}
    </span>
  </button>
</template>
