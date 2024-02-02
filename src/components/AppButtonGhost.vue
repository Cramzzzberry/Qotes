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
  default: 'text-emerald-950',
  info: 'text-blue-400',
  warning: 'text-amber-400',
  success: 'text-emerald-400',
  error: 'text-red-400'
}

const btnSizes = {
  sm: 'h-[30px] max-h-[30px] gap-1 px-2 py-1 text-sm',
  base: 'h-[42px] max-h-[42px] gap-2 px-4 py-2 text-base',
  lg: 'h-[54px] max-h-[54px] gap-3 px-6 py-3 text-xl'
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
    class="inline-grid select-none auto-cols-[max-content_auto_max-content] grid-flow-col items-center rounded-xl border border-transparent bg-transparent text-start font-medium outline-none hover:bg-gray-400/20 active:bg-gray-500/20 disabled:opacity-50"
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
