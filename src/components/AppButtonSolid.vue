<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'base'
  },
  state: {
    type: String,
    default: 'success'
  },
  startIcon: {
    type: String,
    default: null
  },
  endIcon: {
    type: String,
    default: null
  },
  wide: Boolean,
  isLoading: Boolean
})

const states = {
  info: 'border-transparent bg-blue-400 text-blue-950 hover:enabled:bg-blue-500 active:enabled:bg-blue-600',
  warning:
    'border-transparent bg-amber-400 text-amber-950 hover:enabled:bg-amber-500 active:enabled:bg-amber-600',
  success:
    'border-transparent bg-emerald-400 text-emerald-950 hover:enabled:bg-emerald-500 active:enabled:bg-emerald-600',
  error:
    'border-transparent bg-red-400 text-red-950 hover:enabled:bg-red-500 active:enabled:bg-red-600'
}

const btnSizes = {
  sm: ' gap-1 px-2 py-1 text-sm',
  base: ' gap-2 px-4 py-2 text-base',
  lg: ' gap-3 px-6 py-3 text-xl'
}

const iconSizes = {
  sm: 'text-base leading-none',
  base: 'text-lg leading-none',
  lg: 'text-2xl leading-none'
}

const loaderSizes = {
  sm: '16px',
  base: '20px',
  lg: '28px'
}
</script>

<template>
  <button
    :disabled="props.isLoading"
    :class="[states[props.state], btnSizes[props.size], props.wide ? 'w-full justify-center' : '']"
    class="inline-grid select-none auto-cols-[max-content_auto_max-content] grid-flow-col items-center rounded-xl border text-start font-medium outline-none disabled:opacity-50"
  >
    <AppLoader v-if="props.isLoading" :size="loaderSizes[props.size]" />
    <template v-else>
      <span v-if="props.startIcon" :class="iconSizes[props.size]" class="material-icons-round">
        {{ props.startIcon }}
      </span>
      <slot />
      <span v-if="props.endIcon" class="material-icons-round"> {{ props.endIcon }} </span>
    </template>
  </button>
</template>
