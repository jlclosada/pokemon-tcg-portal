<template>
  <div
    class="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 transition-transform transform hover:scale-105 cursor-pointer overflow-hidden group"
    @click="openModal"
  >
    <!-- Fondo animado -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity">
      <img v-if="pokemon.image" :src="pokemon.image" class="object-cover w-full h-full" alt="background" />
    </div>

    <!-- Imagen y nombre -->
    <div class="relative z-10 flex flex-col items-center">
      <img v-if="pokemon.image" :src="pokemon.image" :alt="pokemon.name"
        class="w-28 h-28 md:w-36 md:h-36 transition-transform transform group-hover:scale-110" />
      <h3 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-200 text-center capitalize mt-3">
        {{ pokemon.name }}
      </h3>

      <!-- Tipos -->
      <div v-if="pokemon.types?.length" class="flex justify-center space-x-2 mt-2">
        <span v-for="type in pokemon.types" :key="type" :class="getTypeColor(type)"
          class="px-3 py-1 text-sm font-semibold rounded-lg shadow-md">
          {{ type }}
        </span>
      </div>
    </div>

    <!-- Modal -->
    <UModal v-model="isModalOpen" :overlay="true" @click-outside="closeModal">
      <div class="bg-white dark:bg-gray-900 p-8 rounded-3xl max-w-7xl mx-auto relative overflow-hidden shadow-2xl w-full">
        <button @click="closeModal"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-transform transform hover:rotate-90">
          ❌
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

        <div v-else class="text-center p-6">
          <p class="text-gray-500">Cargando información...</p>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import axios from 'axios';
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
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon.id}`);
    pokemonDetails.value = response.data;
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

const typeTranslations = {
  fire: t("fire"),
  water: t("water"),
  grass: t("grass"),
  electric: t("electric"),
  ice: t("ice"),
  fighting: t("fighting"),
  poison: t("poison"),
  ground: t("ground"),
  flying: t("flying"),
  psychic: t("psychic"),
  bug: t("bug"),
  rock: t("rock"),
  ghost: t("ghost"),
  dragon: t("dragon"),
  dark: t("dark"),
  steel: t("steel"),
  fairy: t("fairy"),
  normal: t("normal"),
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
