<template>
  <router-link
    :to="link"
    class="relative group block rounded-xl overflow-hidden bg-gray-800 bg-opacity-80 shadow-lg backdrop-blur-lg transition-transform duration-300 hover:scale-105"
  >
    <!-- Imagen con efecto dinámico -->
    <div class="relative">
      <img :src="image" class="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-75" alt="Noticia">
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>

    <!-- Contenido -->
    <div class="p-5 relative">
      <h3 class="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
        {{ title }}
      </h3>
      <p class="text-gray-300 text-sm">{{ date }}</p>

      <!-- Brillo en el borde inferior -->
      <div class="absolute bottom-0 left-1/2 w-0 h-1 bg-yellow-400 transition-all duration-300 group-hover:w-3/4 transform -translate-x-1/2"></div>
    </div>

    <!-- Efecto de brillo envolvente -->
    <div class="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-yellow-400 transition-all duration-500"></div>
  </router-link>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  date: String,
  image: String,
  link: String
});
</script>
