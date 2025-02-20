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

    <!-- Botones de Acción -->
    <div class="mt-6 flex justify-center gap-4">
      <UButton
        label="Añadir a Favoritos"
        icon="i-heroicons-heart"
        color="red"
        @click="addToFavorites"
      />
      <UButton
        label="Ver en Cardmarket"
        icon="i-heroicons-external-link"
        color="blue"
        @click="openCardmarket"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ card: any }>();

// Formatear información como debilidad y resistencia
const formatArray = (array) => array?.map(item => item.type + ' (' + item.value + ')').join(', ') || 'N/A';

// Función para "añadir a favoritos"
const addToFavorites = () => {
  console.log(`Añadido a favoritos: ${props.card.name}`);
  alert(`${props.card.name} añadido a favoritos ❤️`);
};

// Función para abrir Cardmarket
const openCardmarket = () => {
  const url = props.card.tcgplayer?.url || props.card.cardmarket?.url;
  if (url) {
    window.open(url, '_blank');
  } else {
    alert('No hay enlace disponible para esta carta.');
  }
};
</script>
