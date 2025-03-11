<template>
  <section class="py-16 bg-gray-100 dark:bg-gray-900 text-center">
    <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Cartas Destacadas</h2>

    <!-- Mensaje de carga -->
    <div v-if="loading" class="flex justify-center items-center h-48">
      <LoadingSpinner />
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="text-red-500 text-lg">
      {{ error }}
    </div>

    <!-- Grid de cartas -->
    <div v-else-if="bestCards.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
      <div
        v-for="card in bestCards"
        :key="card.id"
        class="relative group cursor-pointer overflow-visible rounded-xl shadow-lg transition-transform duration-500 hover:scale-[1.12] hover:rotate-1"
      >
        <!-- Contenedor con efecto de brillo metálico -->
        <div class="relative w-full h-full rounded-xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 group-hover:before:animate-glow">

          <!-- Imagen de la carta -->
          <img
            :src="card.images?.large || card.images?.small"
            :alt="card.name"
            class="w-full transition-transform duration-500 ease-out group-hover:scale-105 group-hover:shadow-metal"
          />
        </div>

        <!-- Brillo en los bordes -->
        <div class="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/70 rounded-xl transition-all duration-500"></div>

        <!-- Información de la carta sobre la parte inferior -->
        <div
          class="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-md text-white p-4 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500 rounded-b-xl"
        >
          <h3 class="text-lg font-bold">{{ card.name }}</h3>
          <p class="text-sm text-gray-300">Rareza: {{ card.rarity || "Desconocida" }}</p>
          <p class="text-sm text-gray-400">HP: {{ card.hp }}</p>
          <p class="text-sm text-gray-500">Tipo: {{ card.types?.join(", ") || "Desconocido" }}</p>
        </div>
      </div>
    </div>

    <!-- Si no hay cartas disponibles -->
    <div v-else class="text-gray-500 dark:text-gray-300 text-lg">
      No se encontraron cartas destacadas.
    </div>
  </section>
</template>

<style scoped>
@keyframes glow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.group:hover .before\:animate-glow {
  animation: glow 1.5s infinite linear;
}

/* Efecto de sombra metálica */
.group-hover\:shadow-metal {
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.5),
              0px 0px 20px rgba(0, 102, 255, 0.8);
}
</style>




<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const allCards = ref([]);
const bestCards = ref([]);
const loading = ref(true);
const error = ref("");

const getRandomCards = () => {
  if (allCards.value.length > 0) {
    bestCards.value = [...allCards.value]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    console.log("🎴 Cartas seleccionadas:", bestCards.value);
  }
};

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    const response = await $apiClient("/cards", {
      params: {
        q: 'rarity:"Secret Rare" OR rarity:"Ultra Rare"',
        pageSize: 50,
      },
    });

    console.log("🔹 API Response:", response);
    allCards.value = response.data;

    if (allCards.value.length > 0) {
      getRandomCards();
    }
  } catch (err) {
    error.value = "Error al cargar las cartas.";
    console.error("❌ Error de API:", err);
  } finally {
    loading.value = false;
  }
});
</script>
