<template>
    <router-link :to="link" class="related-card">
      <img :src="image" alt="Imagen relacionada" class="rounded-md" />
      <h4 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h4>
      <p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
    </router-link>
  </template>
  
  <script setup lang="ts">
  defineProps({
    title: String,
    description: String,
    image: String,
    link: String // Recibe la ruta como propiedad
  });
  </script>
  
  <style scoped>
  .related-card {
    @apply p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer;
  }
  
  .related-card img {
    @apply w-full h-48 object-cover rounded-md mb-4;
  }
  
  .related-card h4 {
    @apply text-xl font-semibold text-gray-900 dark:text-white mb-2;
  }
  
  .related-card p {
    @apply text-sm text-gray-600 dark:text-gray-400;
  }
  </style>
  