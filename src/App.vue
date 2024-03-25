<script setup>
import { RouterView } from 'vue-router';
import AppToast from '@/components/AppToast.vue';

//Initialize sheets' font size
if (!localStorage.getItem('qotes_font_size')) {
  localStorage.setItem('qotes_font_size', 18);
}
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
