<template>
  <USlideover
    :modelValue="isOpen"
    @update:modelValue="emit('update:isOpen', $event)"
  >
    <div class="p-4 flex-1 bg-white dark:bg-gray-900 relative">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="absolute end-5 top-5 z-10"
        square
        padded
        @click="close"
      />

      <div v-if="card" class="mt-10">
        <h2 class="text-xl font-bold text-center mb-4">{{ card.name }}</h2>
        <img :src="card.images.large" :alt="card.name" class="w-full max-w-xs mx-auto rounded-md shadow-md" />

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
