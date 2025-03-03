<template>
  <USlideover
    :modelValue="isOpen"
    @update:modelValue="emit('update:isOpen', $event)"
    class="transition-all duration-500 ease-in-out"
  >
    <div class="p-4 flex-1 bg-gray-800 dark:bg-gray-900 relative rounded-2xl shadow-2xl transform-gpu scale-100 transition-all duration-300 flex flex-col justify-between">

      <!-- Botón de cierre -->
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="absolute top-5 end-5 z-10 transition-transform transform hover:scale-125 focus:outline-none"
        square
        padded
        @click="close"
      />

      <!-- Contenido principal -->
      <div v-if="card" class="flex flex-col items-center justify-between h-full w-full px-2">

        <!-- Título -->
        <h2 class="text-2xl sm:text-3xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
          {{ card.name }}
          <span class="text-lg text-gray-300 dark:text-gray-500">#{{ card.number }}</span>
        </h2>

        <!-- Contenedor con efecto latente -->
        <div class="relative flex items-center justify-center">
          <div class="glow absolute w-48 h-64 md:w-60 md:h-80 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 opacity-60 blur-2xl" />

          <img
            :src="card.images.large"
            :alt="card.name"
            class="relative w-40 sm:w-52 md:w-64 lg:w-72 mx-auto rounded-lg shadow-lg hover:scale-105 transform transition-all duration-500"
          />
        </div>

        <!-- Información -->
        <PokemonInfo :card="card" class="w-full" />
      </div>

    </div>
  </USlideover>
</template>
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import PokemonInfo from './PokemonInfo.vue';

defineProps<{ card: any | null; isOpen: boolean; }>();
const emit = defineEmits(['update:isOpen']);

// Cierra el slide-over y notifica al padre
const close = () => {
  emit('update:isOpen', false);
};
</script>

<style scoped>
/* Efecto de neón sutil para el título */
.text-gradient {
  background-image: linear-gradient(to right, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  color: transparent;
}

/* Efecto de neón para el nombre de la carta */
h2 {
  color: #ffffff;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.6), 0 0 2px rgba(255, 255, 255, 0.6), 0 0 4px rgba(255, 255, 255, 0.6);
}

/* Efecto del número de la colección */
span {
  color: #bbb;
  font-size: 1rem;
  margin-left: 8px;
  transition: color 0.3s ease;
}

.dark span {
  color: #f3eeee;
}

/* Agregar sombras dinámicas y transiciones */
img {
  transition: transform 0.5s ease;
}

img:hover {
  transform: scale(1.05) rotate(3deg);
}

/* Estilo para el botón de cierre */
button {
  transition: transform 0.2s ease, color 0.3s ease;
}

button:hover {
  transform: scale(1.25);
  color: #ff4081;
}

/* Agregar transiciones en el slide-over */
.U_Slideover {
  transition: transform 0.5s ease-in-out, opacity 0.3s ease;
}

.U_Slideover-enter-active, .U_Slideover-leave-active {
  transform: translateX(0);
  opacity: 1;
}

.U_Slideover-enter, .U_Slideover-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Efecto latente de luz */
@keyframes floatingGlow {
  0% {
    transform: translateY(-5px) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(5px) scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: translateY(-5px) scale(1);
    opacity: 0.7;
  }
}

.glow {
  animation: floatingGlow 4s infinite ease-in-out;
}
</style>
