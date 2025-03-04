<template>
  <div class="max-w-3xl mx-auto mt-6 p-6 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg shadow-xl">
    <!-- Campo de búsqueda -->
    <div class="flex items-center border border-gray-500 rounded-lg p-2 shadow-md bg-gray-800">
      <input
        v-model="pokemonName"
        type="text"
        placeholder="Introduce un nombre de Pokémon..."
        class="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 outline-none"
      />
      <button @click="searchPokemon" class="bg-gray-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-500 transition">
        🔍
      </button>
    </div>

    <!-- Resultado de la búsqueda -->
    <transition name="fade">
      <div v-if="pokemonData" class="relative mt-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <!-- Botón de cierre -->
        <button @click="pokemonData = null" class="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl font-bold">
          ❌
        </button>

        <h2 class="text-3xl font-bold text-center uppercase">{{ pokemonData.name }}</h2>
        <div class="flex flex-col md:flex-row items-center justify-between mt-4">
          <img :src="pokemonData.sprites.other['official-artwork'].front_default" :alt="pokemonData.name" class="w-40 h-40 object-contain" />
          <div class="mt-4 md:mt-0 space-y-2 text-gray-300">
            <p><strong>Altura:</strong> {{ pokemonData.height / 10 }} m</p>
            <p><strong>Peso:</strong> {{ pokemonData.weight / 10 }} kg</p>
            <p><strong>Base Experience:</strong> {{ pokemonData.base_experience }}</p>
            <p><strong>Tipo(s):</strong>
              <span v-for="type in pokemonData.types" :key="type.type.name" class="px-2 py-1 text-white rounded-lg mx-1"
                :class="getTypeColor(type.type.name)">
                {{ type.type.name.toUpperCase() }}
              </span>
            </p>
          </div>
        </div>

        <!-- Habilidades -->
        <h3 class="text-xl font-semibold mt-6">Habilidades</h3>
        <ul class="list-disc list-inside text-gray-300">
          <li v-for="ability in pokemonData.abilities" :key="ability.ability.name">{{ ability.ability.name }}</li>
        </ul>

        <!-- Movimientos -->
        <h3 class="text-xl font-semibold mt-6">Movimientos (Top 12)</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <span v-for="move in pokemonData.moves.slice(0, 12)" :key="move.move.name"
            class="bg-gray-700 px-2 py-1 rounded-lg text-sm text-center text-white">
            {{ move.move.name }}
          </span>
        </div>

        <!-- Estadísticas -->
        <h3 class="text-xl font-semibold mt-6">Estadísticas</h3>
        <div v-for="stat in pokemonData.stats" :key="stat.stat.name" class="mt-2">
          <p class="text-gray-300">{{ stat.stat.name.toUpperCase() }}: {{ stat.base_stat }}</p>
          <div class="w-full bg-gray-600 rounded-full h-4">
            <div class="h-4 rounded-full transition-all duration-500 ease-in-out"
              :class="getStatColor(stat.base_stat)"
              :style="{ width: Math.min(stat.base_stat, 100) + '%' }">
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const pokemonName = ref('');
const pokemonData = ref(null);

const searchPokemon = async () => {
  if (!pokemonName.value.trim()) return;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value.toLowerCase()}`);
    pokemonData.value = response.data;
  } catch (error) {
    pokemonData.value = null;
  }
};

const getTypeColor = (type) => {
  const colors = {
    fire: "bg-red-600", water: "bg-blue-500", grass: "bg-green-500", electric: "bg-yellow-500",
    ice: "bg-cyan-400", fighting: "bg-orange-700", poison: "bg-purple-600", ground: "bg-yellow-700",
    flying: "bg-indigo-400", psychic: "bg-pink-500", bug: "bg-lime-600", rock: "bg-gray-700",
    ghost: "bg-indigo-700", dragon: "bg-purple-800", dark: "bg-gray-900", steel: "bg-gray-500", fairy: "bg-pink-400"
  };
  return colors[type] || "bg-gray-400";
};

const getStatColor = (value) => {
  if (value > 100) return "bg-green-500";
  if (value > 75) return "bg-blue-400";
  if (value > 50) return "bg-yellow-400";
  return "bg-red-500";
};
</script>

<style>
/* Animación de desvanecimiento para mostrar/ocultar */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
