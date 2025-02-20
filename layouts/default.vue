<template>
  <div :class="{ dark: isDark }">
    <Navbar />
    <main class="p-4 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import Navbar from '~/components/Navbar.vue';

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});
</script>
