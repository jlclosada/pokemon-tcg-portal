<template>
  <USlideover
    :modelValue="isOpen"
    @update:modelValue="emit('update:isOpen', $event)"
    class="transition-all duration-500 ease-in-out"
  >
    <div class="p-4 flex-1 bg-gray-800 dark:bg-gray-900 relative rounded-2xl shadow-2xl transform-gpu scale-100 transition-all duration-300 flex flex-col items-center max-h-[90vh] sm:max-h-screen overflow-y-auto">

      <!-- Botón de cierre -->
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="absolute top-4 right-4 z-10 hover:scale-110 transition-transform"
        square
        padded
        @click="close"
      />

      <!-- Contenido principal -->
      <div v-if="card" class="flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-4 space-y-4">

        <!-- Título -->
        <!-- Título Mejorado -->
        <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-center relative px-4 py-1 rounded-lg bg-transparent text-white shadow-lg">
          {{ card.name }}
          <span class="text-sm sm:text-lg font-semibold text-gray-100 ml-2 bg-gray-700 px-2 py-1 rounded-md shadow-md">
            #{{ card.number }}
          </span>
        </h2>


        <!-- Contenedor de imagen mejorado -->
        <div class="relative flex items-center justify-center w-full">
          <div class="glow absolute w-56 h-80 sm:w-64 sm:h-96 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 blur-2xl" />

          <img
            :src="card.images.large"
            :alt="card.name"
            class="relative w-48 sm:w-56 md:w-64 lg:w-72 max-h-[50vh] sm:max-h-[75vh] object-contain rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
          />
        </div>

        <!-- Información -->
        <PokemonInfo :card="card" class="w-full max-w-md sm:max-w-lg" />
      </div>

    </div>
  </USlideover>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';
import PokemonInfo from './PokemonInfo.vue';

defineProps<{ card: any | null; isOpen: boolean; }>();
const emit = defineEmits(['update:isOpen']);

const isFavorite = ref(false);

const close = () => {
  emit('update:isOpen', false);
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  alert(isFavorite.value ? "Añadido a Favoritos" : "Eliminado de Favoritos");
};

const openCardMarket = () => {
  const url = props.card.cardmarket?.url || props.card.tcgplayer?.url;
  if (url) window.open(url, "_blank");
};

const viewCardDetails = () => {
  alert(`Mostrando detalles de ${props.card.name}`);
};
</script>

<style scoped>
/* Gradiente en el texto del título */
.text-gradient {
  background-image: linear-gradient(to right, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  color: transparent;
}

/* Efecto de neón en el título */
h2 {
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.5), 0 0 6px rgba(255, 255, 255, 0.4);
}

/* Tamaño dinámico del número de la carta */
span {
  transition: color 0.3s ease;
}

/* Efecto de imagen flotante */
@keyframes floatingGlow {
  0%, 100% {
    transform: translateY(-3px);
    opacity: 0.6;
  }
  50% {
    transform: translateY(3px);
    opacity: 0.8;
  }
}

.glow {
  animation: floatingGlow 4s infinite ease-in-out;
}

/* Transición del botón de cierre */
button {
  transition: transform 0.2s ease, color 0.3s ease;
}

button:hover {
  transform: scale(1.15);
  color: #ff4081;
}

/* Botón estilo Pokémon */
.pokemon-btn {
  font-family: 'Press Start 2P', cursive;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
  white-space: nowrap;
}

.pokemon-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}
</style>
