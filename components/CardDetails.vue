<template>
  <USlideover
    :modelValue="isOpen"
    @update:modelValue="emit('update:isOpen', $event)"
    class="transition-all duration-500 ease-in-out"
  >
    <div class="p-4 flex-1 bg-gray-800 dark:bg-gray-900 relative rounded-2xl shadow-2xl transform-gpu scale-100 transition-all duration-300">
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
      
      <div v-if="card" class="mt-10">
        <!-- Nombre de la carta con número de colección -->
        <h2 class="text-3xl font-extrabold text-center mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">
          {{ card.name }} 
          <span class="text-lg text-gray-300 dark:text-gray-500">#{{ card.number }}</span>
        </h2>
        
        <img
          :src="card.images.large"
          :alt="card.name"
          class="w-full max-w-xs mx-auto rounded-lg shadow-lg hover:scale-105 transform transition-all duration-500"
        />

        <!-- Componente de Información -->
        <PokemonInfo :card="card" />
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
</style>
