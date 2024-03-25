<script setup>
const props = defineProps({
  thickness: {
    type: String,
    default: 'sm'
  },
  size: {
    type: String,
    default: '20px'
  },
  state: {
    type: String,
    default: 'default'
  }
});

const states = {
  default: 'border-t-gray-950',
  info: 'border-t-blue-400',
  warning: 'border-t-amber-400',
  success: 'border-t-emerald-400',
  error: 'border-t-red-400'
};

const thicknesses = {
  sm: 'border-b-[2px] border-x-[2px] border-t-[2px]',
  base: 'border-b-[4px] border-x-[4px] border-t-[4px]',
  lg: 'border-b-[8px] border-x-[8px] border-t-[8px]',
  xl: 'border-b-[16px border-x-[16px] border-t-[16px]',
  '2xl': 'border-b-[32px border-x-[32px] border-t-[32px]',
  '3xl': 'border-b-[48px border-x-[48px] border-t-[48px]'
};
</script>

<template>
  <span
    :class="[states[props.state], thicknesses[props.thickness]]"
    class="size animate-spin rounded-full border-solid border-x-gray-950/20 border-b-gray-950/20"
  ></span>
</template>

<style scoped>
.size {
  width: v-bind('props.size');
  height: v-bind('props.size');
}
</style>
