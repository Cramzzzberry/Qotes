<script setup>
import { RouterView } from 'vue-router';
import AppToast from '@/components/AppToast.vue';
import { onMounted } from 'vue';

//Initialize sheets' font size and dark mode state
if (!localStorage.getItem('qotes_font_size')) {
  localStorage.setItem('qotes_font_size', 18);
}

if (!localStorage.getItem('qotes_dark_mode')) {
  localStorage.setItem('qotes_dark_mode', false);
}

onMounted(() => {
  if (JSON.parse(localStorage.getItem('qotes_dark_mode'))) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
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
