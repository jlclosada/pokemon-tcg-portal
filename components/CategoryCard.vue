<template>
  <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg transform hover:scale-105 transition-transform dark:text-white">
    <!-- Si el icono es una imagen -->
    <div v-if="iconType === 'image'" class="w-12 h-12 mx-auto mb-4 dark:text-white">
      <img :src="icon" alt="icon" class="w-full h-full object-contain" />
    </div>

    <!-- Si el icono es un Heroicon -->
    <div v-else-if="iconType === 'icon'" class="w-12 h-12 mx-auto mb-4">
      <!-- Aplicar color según el tema (oscuro o claro) -->
      <UIcon :name="'i-heroicons-' + iconName" class="w-12 h-12 mx-auto mb-4 dark:text-white text-black" />
    </div>

    <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ title }}</h3>
    <p class="mt-2 text-gray-600 dark:text-gray-300">{{ description }}</p>
    <ULink :to="link" class="mt-4 inline-block text-blue-500 hover:text-blue-700">
      Más información →
    </ULink>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  title: String,
  description: String,
  iconType: String, // 'icon' o 'image'
  iconName: String, // Nombre del icono (por ejemplo, 'home', 'pokedex', etc.)
  icon: String, // Ruta de la imagen para los iconos de tipo 'image'
  link: String
});
</script>
