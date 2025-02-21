<template>
  <div>
    <!--Logo de la coleccion al lado del titulo-->
    <div class="flex items-center gap-2">
      <img :src="collection?.images.logo" :alt="collection?.name" class="w-32 mr-8 object-contain mt-6 mb-6" />
      <h1 class="text-3xl font-bold mb-4 text-center mt-12">{{ collection?.name || "Colección" }}</h1>
    </div>

    <!-- Loading -->
    <LoadingSpinner v-if="loading" class="m-auto 0" />
    <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>

    <!-- Barra de búsqueda -->
    <CardSearch v-if="!loading" @update:filters="updateFilters" />

    <!-- Listado de cartas -->
    <ul v-if="filteredCards.length" class="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
      <li
        v-for="card in filteredCards"
        :key="card.id"
        class="p-1.5 bg-white dark:bg-transparent rounded w-44 hover:scale-110 transition-all cursor-pointer"
        @click="selectCard(card)"
      >
        <img
          :src="card.images.small"
          :alt="card.name"
          class="w-full rounded-md brightness-110 mt-4"
        />
        <p class="mt-3 text-center text-sm font-medium">
          {{ `#${card.number} ${card.name}` }}
        </p>
      </li>
    </ul>
    <!-- Mensaje si no hay resultados -->
<!-- Mensaje si no hay resultados después de buscar -->
<div v-else-if="!loading && hasSearched" class="flex flex-col items-center justify-center mt-10">
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
const collection = ref(null);
const cards = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedCard = ref(null);
const isSlideOverOpen = ref(false);

// Filtros de búsqueda
const filters = ref({
  name: "",
  rarity: "",
  number: "",
});

// Filtrar cartas en base a la búsqueda
const filteredCards = computed(() =>
  cards.value.filter((card) => {
    return (
      (filters.value.name === "" || card.name.toLowerCase().includes(filters.value.name.toLowerCase())) &&
      (filters.value.number === "" || card.number.includes(filters.value.number)) &&
      (filters.value.rarity === "" || (card.rarity && card.rarity.toLowerCase() === filters.value.rarity.toLowerCase()))
    );
  })
);

const hasSearched = ref(false);

// Función para actualizar filtros
const updateFilters = (newFilters) => {
  hasSearched.value = true; // Indica que se realizó una búsqueda
  filters.value = newFilters;
};

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    const collectionResponse = await $apiClient(`/sets/${collectionId}`);
    collection.value = collectionResponse.data;

    const cardsResponse = await $apiClient("/cards", {
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

const selectCard = (card) => {
  selectedCard.value = card;
  isSlideOverOpen.value = true;
};
</script>
