<script setup>
import { RouterView } from 'vue-router'
import AppToast from '@/components/AppToast.vue'
</script>

<template>
  <AppToast />
  <RouterView v-slot="{ Component, route }">
    <transition name="fade-scale" mode="out-in">
      <div class="h-svh w-full overflow-hidden" :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </RouterView>
</template>
