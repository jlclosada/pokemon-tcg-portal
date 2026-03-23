<template>
  <router-link
    :to="link || '/'"
    class="group relative block rounded-2xl overflow-hidden bg-gray-800/60 backdrop-blur-md border border-gray-700/40 transition-all duration-500 hover:scale-[1.03] hover:border-yellow-400/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
  >
    <!-- Imagen con overlay -->
    <div class="relative h-48 overflow-hidden">
      <img :src="image" :alt="title" loading="lazy"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
      <!-- Badge de fecha -->
      <span class="absolute top-3 right-3 px-3 py-1 text-xs font-semibold bg-black/60 backdrop-blur-sm text-yellow-400 rounded-full border border-yellow-400/30">
        {{ date }}
      </span>
    </div>

    <!-- Contenido -->
    <div class="p-5">
      <h3 class="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2 leading-snug">
        {{ title }}
      </h3>
      <span class="inline-flex items-center gap-1 mt-3 text-sm text-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        Leer más →
      </span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  date?: string;
  image?: string;
  link: string;
}>();
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
