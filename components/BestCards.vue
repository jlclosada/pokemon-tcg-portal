<template>
  <section class="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-center">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-4xl font-bold mb-3 text-pokemon-gradient">Cartas Destacadas</h2>
      <p class="text-gray-400 mb-12 text-lg">Descubre cartas raras y ultra raras del TCG</p>

      <!-- Skeleton loader -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="aspect-[2.5/3.5] skeleton rounded-2xl" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-red-400 text-lg py-12">
        <p>⚠️ {{ error }}</p>
      </div>

      <!-- Grid de cartas -->
      <div v-else-if="bestCards.length" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="(card, i) in bestCards"
          :key="card.id"
          class="card-holo group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.08] hover:-rotate-1"
          :style="{ animationDelay: `${i * 150}ms` }"
        >
          <div class="relative">
            <img
              :src="card.images?.large || card.images?.small"
              :alt="card.name"
              loading="lazy"
              class="w-full rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,203,5,0.3)]"
            />
            <!-- Info overlay -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-b-2xl">
              <h3 class="text-sm font-bold text-white">{{ card.name }}</h3>
              <div class="flex justify-between items-center mt-1">
                <span class="text-xs text-yellow-400">{{ card.rarity || "—" }}</span>
                <span v-if="card.hp" class="text-xs text-gray-400">HP {{ card.hp }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin cartas -->
      <div v-else class="text-gray-500 text-lg py-12">
        No se encontraron cartas destacadas.
      </div>

      <!-- Botón refresh -->
      <button
        v-if="bestCards.length"
        @click="getRandomCards"
        class="mt-10 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(255,203,5,0.4)] active:scale-95"
      >
        🔄 Ver otras cartas
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const allCards = ref<any[]>([]);
const bestCards = ref<any[]>([]);
const loading = ref(true);
const error = ref("");

const getRandomCards = () => {
  if (allCards.value.length > 0) {
    bestCards.value = [...allCards.value]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }
};

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    const response: any = await $apiClient("/cards", {
      params: {
        q: 'rarity:"Secret Rare" OR rarity:"Ultra Rare" OR rarity:"Illustration Rare"',
        pageSize: 50,
      },
    });
    allCards.value = response.data;
    if (allCards.value.length > 0) getRandomCards();
  } catch (err) {
    error.value = "Error al cargar las cartas.";
    console.error("Error de API:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
@keyframes glow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
