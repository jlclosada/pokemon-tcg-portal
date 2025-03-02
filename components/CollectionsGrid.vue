<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Encabezado con gradiente -->
    <h1 class="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
      Colecciones Pokémon TCG
    </h1>

    <!-- Estado de carga -->
    <div v-if="loading" class="flex justify-center items-center h-96">
      <LoadingSpinner class="w-16 h-16 text-yellow-400 animate-pulse" />
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="error" class="text-center py-12 text-red-400/90 text-lg font-medium">
      ⚠️ {{ error }}
    </div>

    <!-- Grid de colecciones -->
    <ul v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <li
        v-for="collection in collections"
        :key="collection.id"
        class="group relative p-6 rounded-2xl backdrop-blur-lg bg-white/50 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/30 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
        @click="goToCollection(collection.id)"
      >
        <!-- Efecto de hover -->
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <!-- Imagen de la colección -->
        <div class="relative h-48 w-full flex items-center justify-center p-4">
          <img
            :src="collection.images.logo"
            :alt="collection.name"
            class="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <!-- Nombre y detalles -->
        <div class="mt-6 text-center space-y-2">
          <p class="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
            {{ collection.name }}
          </p>
          <span class="text-sm text-yellow-500 dark:text-yellow-400 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            Ver colección →
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const collections = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    const response = await $apiClient("/sets");
    collections.value = response.data;
  } catch (err) {
    error.value = "Error cargando las colecciones";
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
});

const goToCollection = (collectionId: string) => {
  router.push(`/collection/${collectionId}`);
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animación personalizada para el spinner */
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>