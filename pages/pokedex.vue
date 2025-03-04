<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">Pokédex</h1>

    <!-- Selector de Generaciones -->
    <div class="flex flex-wrap justify-center gap-3 mb-6">
      <button
        v-for="(gen, index) in generations"
        :key="index"
        @click="selectGeneration(gen)"
        @keydown="selectGeneration(gen)"
        :class="[
          'px-4 py-2 rounded-lg font-semibold transition',
          selectedGen === gen ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        ]"
      >
        {{ gen.name }}
      </button>
    </div>

    <!-- Barra de Búsqueda -->
    <div class="mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar Pokémon..."
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>

    <!-- Listado de Pokémon -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <PokemonCard
        v-for="pokemon in filteredPokemon"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>

    <!-- Estado de Carga -->
    <div v-if="loading" class="text-center mt-6">
      <p class="text-gray-500 dark:text-gray-300">Cargando Pokémon...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import PokemonCard from '@/components/PokemonCard.vue';

const pokemonList = ref([]);
const searchQuery = ref('');
const loading = ref(false);

// Definir generaciones con sus rangos de Pokémon
const generations = ref([
  { name: "Gen 1", start: 1, end: 151 },
  { name: "Gen 2", start: 152, end: 251 },
  { name: "Gen 3", start: 252, end: 386 },
  { name: "Gen 4", start: 387, end: 493 },
  { name: "Gen 5", start: 494, end: 649 },
  { name: "Gen 6", start: 650, end: 721 },
  { name: "Gen 7", start: 722, end: 809 },
  { name: "Gen 8", start: 810, end: 905 },
  { name: "Gen 9", start: 906, end: 1010 }
]);

const selectedGen = ref(generations.value[0]); // Selección por defecto: Generación 1

const fetchPokemonByGeneration = async () => {
  loading.value = true;
  pokemonList.value = [];

  try {
    const { start, end } = selectedGen.value;
    const requests = [];

    for (let i = start; i <= end; i++) {
      requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
    }

    const responses = await Promise.all(requests);

    pokemonList.value = responses.map(({ data }) => ({
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      types: data.types.map((t) => t.type.name)
    }));
  } catch (error) {
    console.error('Error al cargar los Pokémon:', error);
  } finally {
    loading.value = false;
  }
};

// Cambiar generación y recargar Pokémon
const selectGeneration = (gen) => {
  selectedGen.value = gen;
  fetchPokemonByGeneration();
};

// Filtrar Pokémon por búsqueda
const filteredPokemon = computed(() => {
  return pokemonList.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  fetchPokemonByGeneration();
});
</script>
