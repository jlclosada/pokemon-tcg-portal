<template>
  <div class="mt-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500 ease-in-out">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="text-sm text-gray-800 dark:text-gray-300 space-y-3">
        <p><strong>Rareza:</strong> {{ card.rarity || 'Desconocida' }}</p>
        <p><strong>Set:</strong> {{ card.set.name }}</p>
        <p><strong>Tipo:</strong> {{ card.types ? card.types.join(', ') : 'No disponible' }}</p>
      </div>

      <div class="text-sm text-gray-800 dark:text-gray-300 space-y-3">
        <p><strong>HP:</strong> {{ card.hp || 'N/A' }}</p>
        <p><strong>Debilidad:</strong> {{ formatArray(card.weaknesses) }}</p>
        <p><strong>Resistencia:</strong> {{ formatArray(card.resistances) }}</p>
      </div>
    </div>

    <!-- Botones -->
    <div class="mt-8 flex justify-center gap-8">
      <FavoriteButton :cardName="card.name" />
      <CardmarketButton :cardUrl="card.cardmarket?.url || card.tcgplayer?.url" />
      <ViewCardDetail />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardmarketButton from "./buttons/CardmarketButton.vue";
import FavoriteButton from "./buttons/FavoriteButton.vue";
import ViewCardDetail from "./buttons/ViewCardDetail.vue";

const props = defineProps<{ card: any }>();

const formatArray = (array) =>
  array?.map((item) => item.type + " (" + item.value + ")").join(", ") || "N/A";
</script>

<style scoped>
/* Transición suave de escala en hover */
.mt-4:hover {
  transform: scale(1.05);
}

/* Título con efecto de sombra para resaltar */
h2 {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 255, 255, 0.6);
}

/* Botones */
button {
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>
