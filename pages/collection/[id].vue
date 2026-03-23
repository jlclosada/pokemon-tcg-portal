<template>
  <div>
    <!-- Logo de la coleccion al lado del titulo-->
    <div class="flex items-center gap-2 justify-center flex-col">
      <img :src="collection?.images.logo" :alt="collection?.name" class="w-52 object-contain mt-12" />

      <!-- <h1 class="text-xl font-bold mb-4 text-center mt-4">{{ collection?.name || "Colección" }}</h1> -->
    </div>

    <!-- Loading -->
    <LoadingSpinner v-if="loading" class="mx-auto mt-8" />

    <!-- Si hay error -->
    <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>

    <!-- Barra de búsqueda -->
    <CardSearch v-if="!loading" @update:filters="updateFilters" />

    <!-- Listado de cartas -->
    <div v-if="filteredCards.length" class="flex justify-center mt-6">
      <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-4 w-full max-w-7xl">
        <li v-for="card in filteredCards" :key="card.id"
          class="p-3 bg-white dark:bg-transparent rounded-lg hover:scale-105 transition-all cursor-pointer flex flex-col items-center"
          @click="selectCard(card)">
          <img :src="card.images.small" :alt="card.name" loading="lazy" class="w-full h-52 object-contain rounded-md mt-4" />

          <!-- Chip único para el nombre y número de la carta -->
          <div class="flex justify-center items-center mt-3">
            <span class="bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center">
              <span class="mr-2">{{ `#${card.number}` }}</span>
              <span class="text-sm">{{ card.name }}</span>
            </span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Mensaje si no hay resultados -->
    <div v-else-if="!loading && hasSearched && !filteredCards.length" class="flex flex-col items-center justify-center mt-10">
      <img src="/images/sad_pokemon.png" alt="No results" class="w-32 h-32 opacity-80" />
      <p class="text-lg font-semibold text-gray-500 dark:text-gray-300 mt-4">Oops, there is no result for your search.</p>
    </div>

    <!-- Slide-over para ver detalles -->
    <CardDetails :card="selectedCard" v-model:isOpen="isSlideOverOpen" />
  </div>
</template>



<script setup lang="ts">
import CardDetails from "@/components/CardDetails.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const collectionId = route.params.id;
const collection = ref<any>(null);
const cards = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedCard = ref<any>(null);
const isSlideOverOpen = ref(false);

// Filtros de búsqueda
const filters = ref({
  name: "",
  rarity: "",
  number: "",
});

// Filtrar cartas en base a la búsqueda
const filteredCards = computed(() =>
  cards.value.filter((card: any) => {
    return (
      (filters.value.name === "" || card.name.toLowerCase().includes(filters.value.name.toLowerCase())) &&
      (filters.value.number === "" || card.number.includes(filters.value.number)) &&
      (filters.value.rarity === "" || (card.rarity && card.rarity.toLowerCase() === filters.value.rarity.toLowerCase()))
    );
  })
);

const hasSearched = ref(false);

// Función para actualizar filtros
const updateFilters = (newFilters: any) => {
  hasSearched.value = true;
  filters.value = newFilters;
};

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    const collectionResponse: any = await $apiClient(`/sets/${collectionId}`);
    collection.value = collectionResponse.data;

    const cardsResponse: any = await $apiClient("/cards", {
      query: { q: `set.id:${collectionId}` },
    });
    cards.value = cardsResponse.data;
  } catch (err) {
    error.value = "No se pudieron obtener los datos.";
    console.error("Error al obtener los datos:", err);
  } finally {
    loading.value = false;
  }
});

const selectCard = (card: any) => {
  selectedCard.value = card;
  isSlideOverOpen.value = true;
};
</script>
