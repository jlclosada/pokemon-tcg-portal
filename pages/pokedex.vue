<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold text-center mb-6 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
      Pokédex
    </h1>

    <!-- Selector de Generaciones -->
    <div class="flex flex-wrap justify-center gap-3 mb-6">
      <button
        v-for="(gen, index) in generations"
        :key="index"
        @click="selectGeneration(gen)"
        :class="[
          'px-6 py-2 rounded-full font-semibold transition-all text-lg border-2 shadow-md',
          selectedGen === gen
            ? 'bg-yellow-500 text-gray-900 border-yellow-300 shadow-lg shadow-yellow-300/40 scale-105'
            : 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-yellow-400 hover:shadow-md hover:shadow-yellow-400/50'
        ]"
      >
        {{ gen.name }}
      </button>
    </div>

    <!-- Barra de Búsqueda -->
    <div class="relative mb-6 max-w-lg mx-auto">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar Pokémon..."
        class="w-full px-4 py-2 rounded-full border bg-gray-900 bg-opacity-80 text-white shadow-md focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 transition-all hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-300/30"
      />
      <div class="absolute inset-y-0 right-4 flex items-center text-yellow-300">
        🔍
      </div>
    </div>

    <!-- Listado de Pokémon -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <PokemonCard
        v-for="pokemon in filteredPokemon"
        :key="pokemon.id"
        :pokemon="pokemon"
        class="transition-all hover:scale-105 hover:shadow-yellow-300"
      />
    </div>

    <!-- Estado de Carga -->
    <div v-if="loading" class="text-center mt-6">
      <LoadingSpinner />
      <p class="text-gray-300 animate-pulse">Cargando Pokémon...</p>
    </div>

    <!-- Error -->
    <div v-if="errorMsg" class="text-center mt-6 text-red-400">
      {{ errorMsg }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';

const pokemonList = ref([]);
const searchQuery = ref('');
const loading = ref(false);
const errorMsg = ref('');

const generations = ref([
  { name: "Gen 1", start: 1, end: 151 },
  { name: "Gen 2", start: 152, end: 251 },
  { name: "Gen 3", start: 252, end: 386 },
  { name: "Gen 4", start: 387, end: 493 },
  { name: "Gen 5", start: 494, end: 649 },
  { name: "Gen 6", start: 650, end: 721 },
  { name: "Gen 7", start: 722, end: 809 },
  { name: "Gen 8", start: 810, end: 905 },
  { name: "Gen 9", start: 906, end: 1025 }
]);

const selectedGen = ref(generations.value[0]);

// Cache de generaciones ya cargadas para evitar re-fetching
const cache = new Map();

const fetchPokemonByGeneration = async () => {
  const cacheKey = `${selectedGen.value.start}-${selectedGen.value.end}`;

  // Si ya tenemos la generación en cache, usarla
  if (cache.has(cacheKey)) {
    pokemonList.value = cache.get(cacheKey);
    return;
  }

  loading.value = true;
  errorMsg.value = '';
  pokemonList.value = [];

  try {
    const { start, end } = selectedGen.value;
    const limit = end - start + 1;
    const offset = start - 1;

    // Una sola petición para obtener la lista de Pokémon
    const listResponse = await $fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

    // Obtener detalles en lotes de 20 para no saturar la API
    const batchSize = 20;
    const allPokemon = [];

    for (let i = 0; i < listResponse.results.length; i += batchSize) {
      const batch = listResponse.results.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (p) => {
          try {
            const data = await $fetch(p.url);
            return {
              id: data.id,
              name: data.name,
              image: data.sprites.other['official-artwork'].front_default,
              types: data.types.map((t) => t.type.name)
            };
          } catch {
            return null;
          }
        })
      );
      allPokemon.push(...batchResults.filter(Boolean));

      // Actualizar progresivamente la UI
      pokemonList.value = [...allPokemon];
    }

    // Guardar en cache
    cache.set(cacheKey, allPokemon);
  } catch (error) {
    console.error('Error al cargar los Pokémon:', error);
    errorMsg.value = 'Error al cargar los Pokémon. Inténtalo de nuevo.';
  } finally {
    loading.value = false;
  }
};

const selectGeneration = (gen) => {
  selectedGen.value = gen;
  searchQuery.value = '';
  fetchPokemonByGeneration();
};

const filteredPokemon = computed(() => {
  if (!searchQuery.value) return pokemonList.value;
  const query = searchQuery.value.toLowerCase();
  return pokemonList.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query) ||
    String(pokemon.id).includes(query)
  );
});

onMounted(() => {
  fetchPokemonByGeneration();
});
</script>

<style scoped>
.container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(255, 223, 0, 0.3);
}

button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.05);
}

input:hover {
  border-color: #FFD700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease-in-out;
}
</style>
