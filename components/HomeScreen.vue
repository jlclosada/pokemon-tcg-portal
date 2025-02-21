<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-white">
    <!-- Logo o Pokéball animada -->
    <img src="/images/pokeball.png" alt="Pokéball" class="w-24 h-24 mb-6 mt-6 animate-floating" />

    <!-- Título principal -->
    <h1 class="text-4xl font-bold mb-4">Pokémon Card Explorer</h1>
    <p class="text-lg opacity-80 mb-8 text-center px-6">Explora, colecciona y descubre todas las cartas de Pokémon TCG.</p>

    <!-- Botón para ir a la galería -->
    <button
      v-if="!showGrid"
      @click="showCollections"
      class="flex items-center gap-2 px-6 py-3 text-lg font-semibold bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-500 transition-all"
    >
      <Search class="w-5 h-5" /> Explorar Colecciones
    </button>

    <!-- Botón para cerrar las colecciones -->
    <button
      v-else
      @click="closeCollections"
      class="flex items-center gap-2 px-6 py-3 text-sm font-normal bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all"
    >
      <X class="w-5 h-5" /> Cerrar Colecciones
    </button>

    <!-- Cargar CollectionsGrid cuando el usuario haga clic -->
    <CollectionsGrid v-if="showGrid" class="mt-10 transition-all duration-500" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CollectionsGrid from "@/components/CollectionsGrid.vue";
import { Search, X } from "lucide-vue-next"; // Importamos los iconos

const showGrid = ref(false);

const showCollections = () => {
  showGrid.value = true;
};
const closeCollections = () => {
  showGrid.value = false;
};
</script>

<style scoped>
@keyframes floating {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-floating {
  animation: floating 2s ease-in-out infinite;
}
</style>
