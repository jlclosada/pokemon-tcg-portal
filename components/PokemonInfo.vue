<template>
  <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold text-center">{{ card.name }}</h2>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="text-sm">
        <p><strong>Rareza:</strong> {{ card.rarity || 'Desconocida' }}</p>
        <p><strong>Set:</strong> {{ card.set.name }}</p>
        <p><strong>Tipo:</strong> {{ card.types ? card.types.join(', ') : 'No disponible' }}</p>
      </div>

      <div class="text-sm">
        <p><strong>HP:</strong> {{ card.hp || 'N/A' }}</p>
        <p><strong>Debilidad:</strong> {{ formatArray(card.weaknesses) }}</p>
        <p><strong>Resistencia:</strong> {{ formatArray(card.resistances) }}</p>
      </div>
    </div>

    <!-- Botones -->
    <div class="mt-6 flex justify-center gap-4">
      <FavoriteButton :cardName="card.name" />
      <CardmarketButton :cardUrl="card.tcgplayer?.url || card.cardmarket?.url" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardmarketButton from "./buttons/CardmarketButton.vue";
import FavoriteButton from "./buttons/FavoriteButton.vue";

const props = defineProps<{ card: any }>();

const formatArray = (array) =>
  array?.map((item) => item.type + " (" + item.value + ")").join(", ") || "N/A";
</script>
