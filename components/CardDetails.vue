<template>
  <USlideover
    :modelValue="isOpen"
    @update:modelValue="emit('update:isOpen', $event)"
  >
    <div class="flex-1 bg-gray-900 relative flex flex-col max-h-screen overflow-y-auto">
      <!-- Header con botón cerrar -->
      <div class="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-800">
        <h2 v-if="card" class="text-lg font-bold text-white flex items-center gap-2">
          {{ card.name }}
          <span class="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/30">
            #{{ card.number }}
          </span>
        </h2>
        <button @click="close"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
          ✕
        </button>
      </div>

      <!-- Contenido -->
      <div v-if="card" class="flex flex-col items-center px-4 py-6 space-y-6">
        <!-- Imagen con glow -->
        <div class="relative flex items-center justify-center w-full">
          <div class="glow absolute w-56 h-80 rounded-xl bg-gradient-to-br from-yellow-400/30 to-purple-500/30 blur-3xl" />
          <img
            :src="card.images.large"
            :alt="card.name"
            class="card-holo relative w-52 sm:w-60 md:w-72 object-contain rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.05]"
          />
        </div>

        <!-- Detalles de la carta -->
        <div class="w-full max-w-sm space-y-3">
          <!-- Rareza -->
          <div v-if="card.rarity" class="flex items-center justify-between p-3 bg-gray-800/60 rounded-xl border border-gray-700/30">
            <span class="text-sm text-gray-400">Rareza</span>
            <span class="text-sm font-bold text-yellow-400">{{ card.rarity }}</span>
          </div>
          <!-- Set -->
          <div v-if="card.set" class="flex items-center justify-between p-3 bg-gray-800/60 rounded-xl border border-gray-700/30">
            <span class="text-sm text-gray-400">Set</span>
            <span class="text-sm font-semibold text-white">{{ card.set.name }}</span>
          </div>
          <!-- HP -->
          <div v-if="card.hp" class="flex items-center justify-between p-3 bg-gray-800/60 rounded-xl border border-gray-700/30">
            <span class="text-sm text-gray-400">HP</span>
            <span class="text-sm font-bold text-red-400">{{ card.hp }}</span>
          </div>
          <!-- Tipos -->
          <div v-if="card.types?.length" class="flex items-center justify-between p-3 bg-gray-800/60 rounded-xl border border-gray-700/30">
            <span class="text-sm text-gray-400">Tipo</span>
            <div class="flex gap-1">
              <span v-for="t in card.types" :key="t" class="text-xs font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">{{ t }}</span>
            </div>
          </div>
          <!-- Artista -->
          <div v-if="card.artist" class="flex items-center justify-between p-3 bg-gray-800/60 rounded-xl border border-gray-700/30">
            <span class="text-sm text-gray-400">Artista</span>
            <span class="text-sm text-white">{{ card.artist }}</span>
          </div>
        </div>

        <!-- Acciones -->
        <PokemonInfo :card="card" class="w-full max-w-sm" />
      </div>
    </div>
  </USlideover>
</template>

<script setup lang="ts">
import PokemonInfo from './PokemonInfo.vue';

defineProps<{ card: any | null; isOpen: boolean; }>();
const emit = defineEmits(['update:isOpen']);

const close = () => {
  emit('update:isOpen', false);
};
</script>

<style scoped>
@keyframes floatingGlow {
  0%, 100% { transform: translateY(-3px); opacity: 0.5; }
  50% { transform: translateY(3px); opacity: 0.7; }
}
.glow {
  animation: floatingGlow 4s infinite ease-in-out;
}
</style>
