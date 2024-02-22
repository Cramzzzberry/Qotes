<script setup>
const model = defineModel()
const props = defineProps({
  label: String,
  subLabel: String,
  options: {
    type: Array,
    default: null
  },
  state: {
    default: 'default',
    type: String
  },
  wide: Boolean
})

const states = {
  default: 'text-deadgreen-700 border-deadgreen-200 focus:border-deadgreen-700',
  info: 'text-blue-950 border-gray-300 focus:border-blue-400',
  warning: 'text-amber-950 border-gray-300 focus:border-amber-400',
  success: 'text-emerald-950 border-gray-300 focus:border-emerald-400',
  error: 'text-red-950 border-red-400'
}
</script>

<template>
  <label
    :class="[states[props.state], props.wide ? 'w-full' : 'w-fit']"
    class="group relative flex cursor-pointer flex-col justify-center gap-1"
  >
    <span
      v-if="props.label"
      :class="props.state === 'error' ? 'text-red-400' : 'text-gray-500'"
      class="px-1 font-light transition-colors group-focus-within:text-gray-950"
    >
      {{ props.label }}
    </span>
    <select
      v-model="model"
      v-bind="$attrs"
      :class="[states[props.state], props.wide ? 'w-full' : 'w-fit']"
      class="cursor-pointer rounded-xl border border-gray-300 bg-transparent py-2 pl-4 pr-8 shadow-sm outline-none transition-colors hover:border-deadgreen-300"
    >
      <option v-for="option in props.options" :key="option" class="bg-doublemint-50">
        {{ option }}
      </option>
    </select>

    <p
      v-if="props.subLabel"
      :class="props.state === 'error' ? 'text-red-400' : 'text-gray-500'"
      class="place-self-end font-light"
    >
      {{ props.subLabel }}
    </p>

    <span
      :class="{ 'translate-y-1/2': props.label }"
      class="material-icons-round pointer-events-none absolute right-3 text-lg text-gray-500 transition-colors group-focus-within:text-gray-950"
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
