<script setup>
const model = defineModel()
const props = defineProps({
  state: {
    default: 'success',
    type: String
  },
  label: String,
  subLabel: String
})

const states = {
  info: 'text-blue-950 border-gray-300 hover:border-gray-400 focus:border-blue-400',
  warning: 'text-amber-950 border-gray-300 hover:border-gray-400 focus:border-amber-400',
  success: 'text-emerald-950 border-gray-300 hover:border-gray-400 focus:border-emerald-400',
  error: 'text-red-950 border-red-400'
}
</script>

<template>
  <label class="group flex flex-col gap-1 transition-colors">
    <p
      v-if="props.label"
      :class="[
        props.state === 'error' ? 'text-red-400' : 'text-gray-500 group-focus-within:text-gray-950'
      ]"
      class="px-1 font-light transition-colors"
    >
      {{ props.label }}
    </p>
    <input
      v-model="model"
      v-bind="$attrs"
      :class="states[props.state]"
      class="rounded-xl border bg-transparent px-4 py-2 outline-none transition-colors"
    />
    <p
      v-if="props.subLabel"
      :class="[props.state === 'error' ? 'text-red-400' : 'text-gray-500']"
      class="place-self-end font-light"
    >
      {{ props.subLabel }}
    </p>
  </label>
</template>
