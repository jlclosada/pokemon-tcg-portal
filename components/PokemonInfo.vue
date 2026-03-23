<template>
  <div class="w-full space-y-3">
    <!-- Precio medio -->
    <div v-if="card.cardmarket?.prices?.averageSellPrice" class="flex items-center justify-between p-3.5 bg-gray-800/50 rounded-xl border border-gray-700/30">
      <span class="text-sm text-gray-400">Precio medio</span>
      <span class="text-lg font-extrabold text-green-400">{{ card.cardmarket.prices.averageSellPrice.toFixed(2) }} €</span>
    </div>

    <!-- Precio tendencia -->
    <div v-if="card.cardmarket?.prices?.trendPrice" class="flex items-center justify-between p-3.5 bg-gray-800/50 rounded-xl border border-gray-700/30">
      <span class="text-sm text-gray-400">Tendencia</span>
      <span class="text-base font-bold text-yellow-400">{{ card.cardmarket.prices.trendPrice.toFixed(2) }} €</span>
    </div>

    <!-- Botón Cardmarket -->
    <a v-if="card.cardmarket?.url || card.tcgplayer?.url"
      :href="card.cardmarket?.url || card.tcgplayer?.url"
      target="_blank" rel="noopener noreferrer"
      class="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.5.5-.1 1.4.6 1.4H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
      Ver en Cardmarket
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{ card: any }>();
</script>

