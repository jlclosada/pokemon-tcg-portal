<template>
  <div
    class="relative rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700/30 hover:border-yellow-400/30 transition-all duration-400 cursor-pointer group hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(255,203,5,0.12)]"
    @click="openModal"
  >
    <!-- Número del Pokémon -->
    <span class="absolute top-2 right-2 z-10 text-xs font-bold text-gray-500 dark:text-gray-500 bg-gray-200/80 dark:bg-gray-900/80 px-2 py-0.5 rounded-full">
      #{{ pokemon.id }}
    </span>

    <!-- Imagen -->
    <div class="flex justify-center pt-6 pb-2 px-4">
      <img v-if="pokemon.image" :src="pokemon.image" :alt="pokemon.name" loading="lazy"
        class="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-115 group-hover:-translate-y-1" />
    </div>

    <!-- Info -->
    <div class="relative z-10 flex flex-col items-center pb-4 px-3">
      <h3 class="text-sm md:text-base font-bold text-white text-center capitalize group-hover:text-yellow-400 transition-colors">
        {{ pokemon.name }}
      </h3>

      <!-- Tipos -->
      <div v-if="pokemon.types?.length" class="flex justify-center gap-1.5 mt-2">
        <span v-for="type in pokemon.types" :key="type" :class="getTypeColor(type)"
          class="px-2 py-0.5 text-xs font-semibold rounded-full shadow-sm">
          {{ type }}
        </span>
      </div>
    </div>

    <!-- Modal -->
    <UModal v-model="isModalOpen" :overlay="true" @click-outside="closeModal">
      <div class="bg-gray-900 p-6 md:p-8 rounded-2xl mx-auto relative overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto">
        <button @click="closeModal"
          class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all z-20">
          ✕
        </button>

        <div v-if="pokemonDetails">
          <div class="flex flex-col md:grid-cols-1 gap-6">
            <!-- Imagen -->
            <div class="flex justify-center">
              <img v-if="pokemonDetails.sprites" :src="pokemonDetails.sprites.other['official-artwork'].front_default"
                :alt="pokemonDetails.name"
                class="w-80 h-80 md:w-96 md:h-96 drop-shadow-lg transition-transform transform hover:scale-110" />
            </div>

            <!-- Detalles -->
            <div class="flex flex-col justify-center">
              <h2 class="text-4xl font-bold capitalize text-gray-800 dark:text-gray-200 mb-2 text-center md:text-left">
                #{{ pokemonDetails.id }} {{ pokemonDetails.name }}
              </h2>

              <div class="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <span v-for="type in pokemonDetails.types"
                      :key="type.type.name"
                      :class="getTypeColor(type.type.name)"
                      class="px-3 py-1 text-lg font-semibold rounded-lg shadow-md">
                  {{ translateType(type.type.name) }}
                </span>
              </div>
              <p class="text-gray-600 dark:text-gray-300 text-lg">
                <strong>{{ t('weight') }}:</strong> {{ pokemonDetails.weight / 10 }} kg
              </p>
              <p class="text-gray-600 dark:text-gray-300 text-lg">
                <strong>{{ t('height') }}:</strong> {{ pokemonDetails.height / 10 }} m
              </p>

              <!-- Habilidades -->
              <h3 class="mt-6 text-2xl font-semibold">{{ t('abilities') }}:</h3>
              <ul v-if="pokemonDetails.abilities?.length" class="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg">
                <li v-for="ability in pokemonDetails.abilities" :key="ability.ability.name">
                  {{ ability.ability.name }}
                </li>
              </ul>

              <!-- Estadísticas -->
              <h3 class="mt-6 text-2xl font-semibold">{{ t('statistics')}}:</h3>
              <div v-if="pokemonDetails.stats?.length" class="grid grid-cols-1 gap-4">
                <div v-for="stat in pokemonDetails.stats" :key="stat.stat.name">
                  <div class="flex justify-between items-center mb-1">
                    <span class="capitalize font-semibold text-gray-800 dark:text-gray-300 text-lg">
                      {{ stat.stat.name }}:
                    </span>
                    <span class="font-bold text-lg">{{ stat.base_stat }}</span>
                  </div>
                  <div class="w-full bg-gray-300 dark:bg-gray-700 h-6 rounded-lg overflow-hidden">
                    <div
                      :style="{ width: stat.base_stat + '%' }"
                      :class="getStatColor(stat.base_stat)"
                      class="h-full transition-all duration-700 ease-in-out"
                    ></div>
                  </div>
                </div>
              </div>


              <!-- Movimientos -->
              <h3 class="mt-6 text-2xl font-semibold">{{ t('movements') }}:</h3>
              <div v-if="pokemonDetails.moves?.length" class="flex flex-wrap gap-2">
                <span v-for="move in pokemonDetails.moves.slice(0, 10)" :key="move.move.name"
                  class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm font-semibold shadow">
                  {{ move.move.name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center p-8">
          <LoadingSpinner />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from "#imports";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
});
const { t } = useI18n(); // Accede a la función de traducción

const isModalOpen = ref(false);
const pokemonDetails = ref(null);
const translateType = (type) => {
  return t(type) || type; // Devuelve la traducción si existe, si no, el mismo valor
};


const openModal = async () => {
  isModalOpen.value = true;
  await fetchPokemonDetails();
};

const closeModal = () => {
  isModalOpen.value = false;
};

const fetchPokemonDetails = async () => {
  try {
    pokemonDetails.value = await $fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemon.id}`);
  } catch (error) {
    console.error('Error al cargar los detalles del Pokémon:', error);
    pokemonDetails.value = null;
  }
};

const getStatColor = (stat) => {
  if (stat > 70) return 'bg-green-500 dark:bg-green-400'; // Verde
  if (stat > 50) return 'bg-yellow-500 dark:bg-yellow-400'; // Amarillo
  return 'bg-red-500 dark:bg-red-400'; // Rojo
};


const getTypeColor = (type) => {
  const colors = {
    fire: 'bg-red-500 text-white',
    water: 'bg-blue-500 text-white',
    grass: 'bg-green-500 text-white',
    electric: 'bg-yellow-500 text-gray-800',
    ice: 'bg-cyan-400 text-gray-800',
    fighting: 'bg-orange-700 text-white',
    poison: 'bg-purple-600 text-white',
    ground: 'bg-yellow-700 text-white',
    flying: 'bg-indigo-400 text-white',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-lime-500 text-gray-800',
    rock: 'bg-gray-600 text-white',
    ghost: 'bg-indigo-800 text-white',
    dragon: 'bg-purple-800 text-white',
    dark: 'bg-gray-900 text-white',
    steel: 'bg-gray-400 text-gray-900',
    fairy: 'bg-pink-300 text-gray-800',
    normal: 'bg-gray-500 text-white',
  };
  return colors[type] || 'bg-gray-400 text-white';
};
</script>
