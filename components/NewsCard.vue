<template>
  <div class="bg-transparent backdrop-blur-md rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
    <img :src="image" class="w-full h-40 object-cover" alt="Noticia">
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ title }}</h3>
      <p class="text-gray-500 dark:text-gray-400 text-sm">{{ date }}</p>
      <router-link :to="link" class="text-blue-500 hover:text-blue-700">Leer más</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  date: String,
  image: String,
  link: String
});
</script>
