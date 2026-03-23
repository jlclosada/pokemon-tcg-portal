<template>
  <div
    class="pokemon-card group cursor-pointer"
    @click="openModal"
  >
    <!-- Número -->
    <span class="absolute top-2 right-2 z-10 text-[10px] font-bold text-white/40">
      #{{ String(pokemon.id).padStart(3, '0') }}
    </span>

    <!-- Imagen -->
    <div class="flex justify-center pt-5 pb-1 px-3">
      <img v-if="pokemon.image" :src="pokemon.image" :alt="pokemon.name" loading="lazy"
        class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_4px_12px_rgba(255,203,5,0.2)] transition-all duration-500 group-hover:scale-[1.18] group-hover:-translate-y-2 group-hover:drop-shadow-[0_8px_20px_rgba(255,203,5,0.35)]" />
    </div>

    <!-- Info -->
    <div class="relative z-10 flex flex-col items-center pb-4 px-2 gap-1.5">
      <h3 class="text-xs sm:text-sm font-bold text-white text-center capitalize leading-tight group-hover:text-yellow-400 transition-colors duration-300">
        {{ pokemon.name }}
      </h3>
      <div v-if="pokemon.types?.length" class="flex gap-1">
        <span v-for="type in pokemon.types" :key="type" :class="getTypeColor(type)"
          class="px-2 py-[2px] text-[10px] font-bold rounded-full capitalize">
          {{ type }}
        </span>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-3/4 transition-all duration-500 rounded-full" />

    <!-- ====== MODAL ====== -->
    <UModal v-model="isModalOpen" :overlay="true" @click-outside="closeModal">
      <div class="pokemon-modal">
        <!-- Close -->
        <button @click="closeModal" class="modal-close">✕</button>

        <div v-if="pokemonDetails" class="space-y-5">
          <!-- Imagen con fondo tipo -->
          <div class="relative flex justify-center py-4">
            <div class="absolute inset-0 rounded-2xl opacity-20 blur-2xl" :class="getTypeBgGlow(pokemonDetails.types?.[0]?.type?.name)" />
            <img :src="pokemonDetails.sprites?.other?.['official-artwork']?.front_default"
              :alt="pokemonDetails.name"
              class="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain drop-shadow-2xl animate-float" />
          </div>

          <!-- Nombre y número -->
          <div class="text-center">
            <h2 class="text-2xl sm:text-3xl font-extrabold capitalize text-white">
              {{ pokemonDetails.name }}
            </h2>
            <span class="text-sm text-gray-500">#{{ String(pokemonDetails.id).padStart(3, '0') }}</span>
          </div>

          <!-- Tipos -->
          <div class="flex justify-center gap-2">
            <span v-for="type in pokemonDetails.types" :key="type.type.name" :class="getTypeColor(type.type.name)"
              class="px-4 py-1 text-sm font-bold rounded-full capitalize shadow-md">
              {{ translateType(type.type.name) }}
            </span>
          </div>

          <!-- Stats grid -->
          <div class="grid grid-cols-2 gap-3 bg-gray-800/40 rounded-xl p-4">
            <div class="stat-box">
              <span class="stat-label">{{ t('weight') }}</span>
              <span class="stat-value">{{ (pokemonDetails.weight / 10).toFixed(1) }} kg</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">{{ t('height') }}</span>
              <span class="stat-value">{{ (pokemonDetails.height / 10).toFixed(1) }} m</span>
            </div>
            <div class="stat-box col-span-2">
              <span class="stat-label">{{ t('abilities') }}</span>
              <div class="flex flex-wrap gap-1.5 mt-1">
                <span v-for="a in pokemonDetails.abilities" :key="a.ability.name"
                  class="px-2.5 py-0.5 bg-gray-700/80 rounded-full text-xs text-gray-300 capitalize border border-gray-600/40">
                  {{ a.ability.name.replace('-', ' ') }}
                </span>
              </div>
            </div>
          </div>

          <!-- Barras de stats -->
          <div class="space-y-2.5">
            <h4 class="text-sm font-bold text-yellow-400 uppercase tracking-wider">{{ t('statistics') }}</h4>
            <div v-for="stat in pokemonDetails.stats" :key="stat.stat.name" class="flex items-center gap-3">
              <span class="text-[11px] text-gray-400 capitalize w-20 truncate">{{ stat.stat.name.replace('-', ' ') }}</span>
              <div class="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div :style="{ width: Math.min(stat.base_stat / 1.5, 100) + '%' }" :class="getStatColor(stat.base_stat)"
                  class="h-full rounded-full transition-all duration-1000 ease-out" />
              </div>
              <span class="text-xs font-bold text-white w-8 text-right">{{ stat.base_stat }}</span>
            </div>
          </div>

          <!-- Movimientos -->
          <div>
            <h4 class="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2">{{ t('movements') }}</h4>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="move in pokemonDetails.moves.slice(0, 12)" :key="move.move.name"
                class="px-2 py-0.5 bg-gray-800/80 rounded-md text-[11px] text-gray-400 border border-gray-700/30 capitalize">
                {{ move.move.name.replace('-', ' ') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-else class="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from "#imports";

const props = defineProps({ pokemon: { type: Object, required: true } });
const { t } = useI18n();

const isModalOpen = ref(false);
const pokemonDetails = ref(null);
const translateType = (type) => t(type) || type;

const openModal = async () => {
  isModalOpen.value = true;
  if (!pokemonDetails.value) await fetchPokemonDetails();
};
const closeModal = () => { isModalOpen.value = false; };

const fetchPokemonDetails = async () => {
  try {
    pokemonDetails.value = await $fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemon.id}`);
  } catch (e) {
    console.error('Error:', e);
    pokemonDetails.value = null;
  }
};

const getStatColor = (s) => {
  if (s >= 120) return 'bg-emerald-400';
  if (s >= 90) return 'bg-green-500';
  if (s >= 60) return 'bg-yellow-500';
  if (s >= 40) return 'bg-orange-500';
  return 'bg-red-500';
};

const getTypeBgGlow = (type) => {
  const map = { fire: 'bg-red-500', water: 'bg-blue-500', grass: 'bg-green-500', electric: 'bg-yellow-400',
    psychic: 'bg-pink-500', ice: 'bg-cyan-300', dragon: 'bg-purple-600', dark: 'bg-gray-700',
    fairy: 'bg-pink-300', fighting: 'bg-orange-600', poison: 'bg-purple-500', ground: 'bg-yellow-600',
    flying: 'bg-indigo-400', bug: 'bg-lime-500', rock: 'bg-gray-500', ghost: 'bg-indigo-700',
    steel: 'bg-gray-400', normal: 'bg-gray-500' };
  return map[type] || 'bg-gray-500';
};

const getTypeColor = (type) => {
  const c = {
    fire: 'bg-red-500 text-white', water: 'bg-blue-500 text-white', grass: 'bg-green-500 text-white',
    electric: 'bg-yellow-500 text-gray-900', ice: 'bg-cyan-400 text-gray-900', fighting: 'bg-orange-700 text-white',
    poison: 'bg-purple-600 text-white', ground: 'bg-yellow-700 text-white', flying: 'bg-indigo-400 text-white',
    psychic: 'bg-pink-500 text-white', bug: 'bg-lime-500 text-gray-900', rock: 'bg-gray-600 text-white',
    ghost: 'bg-indigo-800 text-white', dragon: 'bg-purple-800 text-white', dark: 'bg-gray-900 text-white',
    steel: 'bg-gray-400 text-gray-900', fairy: 'bg-pink-300 text-gray-900', normal: 'bg-gray-500 text-white',
  };
  return c[type] || 'bg-gray-400 text-white';
};
</script>

<style scoped>
.pokemon-card {
  @apply relative rounded-2xl overflow-hidden bg-gray-800/40 backdrop-blur-sm border border-gray-700/20 transition-all duration-500;
}
.pokemon-card:hover {
  border-color: rgba(251, 191, 36, 0.35);
  box-shadow: 0 0 30px rgba(255, 203, 5, 0.08), 0 8px 32px rgba(0,0,0,0.3);
  transform: translateY(-4px);
}

.pokemon-modal {
  @apply bg-gray-900 p-5 sm:p-7 rounded-2xl relative overflow-y-auto shadow-2xl;
  max-height: 88vh;
}
.modal-close {
  @apply absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all z-20 text-sm;
}
.stat-box {
  @apply text-center p-2.5 bg-gray-900/60 rounded-lg;
}
.stat-label {
  @apply block text-[10px] text-gray-500 uppercase tracking-wider;
}
.stat-value {
  @apply block text-base font-bold text-white mt-0.5;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>
