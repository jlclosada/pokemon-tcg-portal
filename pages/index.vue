<template>
  <h1 class="text-2xl font-bold mb-4">Pokémon TCG - Cartas de la colección</h1>
  <div v-if="loading" class="text-center">Cargando cartas...</div>
  <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
  <ul v-else class="grid grid-cols-2 md:grid-cols-5 gap-2">
    <li
      v-for="card in cards"
      :key="card.id"
      class="p-1.5 bg-white dark:bg-gray-800 rounded shadow w-44 hover:scale-105 transition-all cursor-pointer"
      @click="selectCard(card)"
    >
      <img
        :src="card.images.small"
        :alt="card.name"
        class="w-full rounded-md brightness-110"
      />
      <p class="mt-1 text-center text-sm font-medium">{{ `#${card.number}  ${card.name}` }}</p>
    </li>
  </ul>

  <!-- Slide-over para ver detalles de la carta -->
  <CardDetails :card="selectedCard" v-model:isOpen="isSlideOverOpen" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardDetails from '~/components/CardDetails.vue';

const cards = ref([]);
const loading = ref(true);
const error = ref(null);

const selectedCard = ref(null);
const isSlideOverOpen = ref(false);

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    const response = await $apiClient('/cards', {
      query: { q: 'set.id:base1' },
    });
    cards.value = response.data;
  } catch (err) {
    error.value = 'No se pudieron obtener las cartas.';
    console.error('Error al obtener las cartas:', err);
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
