<!-- pages/collection/[id].vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">{{ collection?.name || "Colección" }}</h1>
    <div v-if="loading" class="text-center">Cargando cartas...</div>
    <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>

    <ul v-else class="grid grid-cols-2 md:grid-cols-5 gap-2">
      <li
        v-for="card in cards"
        :key="card.id"
        class="p-1.5 bg-white dark:bg-transparent rounded w-44 hover:scale-110 transition-all cursor-pointer"
        @click="selectCard(card)"
      >
        <img
          :src="card.images.small"
          :alt="card.name"
          class="w-full rounded-md brightness-110"
        />
        <p class="mt-1 text-center text-sm font-medium">
          {{ `#${card.number} ${card.name}` }}
        </p>
      </li>
    </ul>

    <!-- Slide-over para ver detalles de la carta -->
    <CardDetails :card="selectedCard" v-model:isOpen="isSlideOverOpen" />
  </div>
</template>

<script setup lang="ts">
import CardDetails from "@/components/CardDetails.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const collectionId = route.params.id;
const collection = ref(null);
const cards = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedCard = ref(null);
const isSlideOverOpen = ref(false);

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    // Obtener info de la colección
    const collectionResponse = await $apiClient(`/sets/${collectionId}`);
    collection.value = collectionResponse.data;

    // Obtener cartas de la colección
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

// Abre el slide-over con la carta seleccionada
const selectCard = (card) => {
  selectedCard.value = card;
  isSlideOverOpen.value = true;
};
</script>
