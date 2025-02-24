<template>
  <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
    <!-- Barra de Búsqueda -->
    <div class="flex items-center gap-2 mb-4">
      <input
        v-model="filters.name"
        @input="onSearch"
        placeholder="Buscar cartas..."
        class="w-full p-2 rounded-md border dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <Icon name="heroicons:magnifying-glass" class="w-6 h-6 text-gray-500 dark:text-gray-300" />
    </div>

    <!-- Filtros -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
      <select v-model="filters.rarity" @change="fetchCards" class="p-2 border rounded-md dark:bg-gray-700">
        <option value="">Rareza</option>
        <option value="Common">Común</option>
        <option value="Uncommon">No Común</option>
        <option value="Rare">Rara</option>
        <!-- Agrega más opciones de rareza según la API -->
      </select>
      <select v-model="filters.type" @change="fetchCards" class="p-2 border rounded-md dark:bg-gray-700">
        <option value="">Tipo</option>
        <option value="Pokémon">Pokémon</option>
        <option value="Trainer">Entrenador</option>
        <option value="Energy">Energía</option>
        <!-- Agrega más opciones de tipo según la API -->
      </select>
      <select v-model="filters.set" @change="fetchCards" class="p-2 border rounded-md dark:bg-gray-700">
        <option value="">Set</option>
        <option v-for="set in sets" :key="set.id" :value="set.id">{{ set.name }}</option>
      </select>
      <input
        v-model="filters.number"
        @input="fetchCards"
        placeholder="Número de carta"
        class="p-2 border rounded-md dark:bg-gray-700"
      />
    </div>

    <!-- Resultados -->
    <div v-if="loading" class="text-center text-gray-500">Cargando...</div>
    <div v-else-if="filteredCards.length === 0" class="text-center text-gray-500">No se encontraron cartas.</div>

    <ul v-else class="divide-y divide-gray-300 dark:divide-gray-700 mt-4">
      <li
        v-for="card in filteredCards"
        :key="card.id"
        class="flex items-center p-4 bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition"
        @click="selectCard(card)"
      >
        <img :src="card.images?.small" :alt="card.name" class="w-16 h-20 object-contain rounded-md mr-4" />
        <div>
          <p class="text-lg font-semibold">{{ card.name }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ card.set.name }} - #{{ card.number }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ card.rarity || "Sin rareza" }} - {{ card.types?.join(', ') }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import axios from "axios";

const router = useRouter();
const cards = ref([]);
const sets = ref([]);
const loading = ref(false);
const hasSearched = ref(false);

const filters = ref({
  name: "",
  rarity: "",
  type: "",
  set: "",
  number: "",
});

// Filtrado local basado en los filtros
const filteredCards = computed(() =>
  cards.value.filter((card) => {
    return (
      (filters.value.name === "" || card.name.toLowerCase().includes(filters.value.name.toLowerCase())) &&
      (filters.value.number === "" || card.number.includes(filters.value.number)) &&
      (filters.value.rarity === "" || (card.rarity && card.rarity.toLowerCase() === filters.value.rarity.toLowerCase())) &&
      (filters.value.type === "" || (card.types && card.types.includes(filters.value.type))) &&
      (filters.value.set === "" || card.set.id === filters.value.set)
    );
  })
);

// Buscar con debounce para evitar muchas peticiones
const onSearch = useDebounceFn(() => {
  fetchCards();
}, 500);

// Función para obtener cartas desde la API
const fetchCards = async () => {
  loading.value = true;
  hasSearched.value = true;

  try {
    const response = await axios.get("https://api.pokemontcg.io/v2/cards", {
      params: {
        q: [
          filters.value.name ? `name:${filters.value.name}*` : "",
          filters.value.rarity ? `rarity:${filters.value.rarity}` : "",
          filters.value.type ? `types:${filters.value.type}` : "",
          filters.value.set ? `set.id:${filters.value.set}` : "",
          filters.value.number ? `number:${filters.value.number}` : "",
        ].filter(Boolean).join(" "),
      },
      headers: {
        "X-Api-Key": "TU_API_KEY_AQUÍ", // Reemplaza con tu clave de API
      },
    });

    cards.value = response.data?.data || [];
  } catch (error) {
    console.error("Error al obtener cartas:", error);
  } finally {
    loading.value = false;
  }
};

// Obtener sets disponibles
const fetchSets = async () => {
  try {
    const response = await axios.get("https://api.pokemontcg.io/v2/sets", {
      headers: {
        "X-Api-Key": "TU_API_KEY_AQUÍ", // Reemplaza con tu clave de API
      },
    });
    sets.value = response.data?.data || [];
  } catch (error) {
    console.error("Error al obtener sets:", error);
  }
};

// Seleccionar carta
const selectCard = (card) => {
  router.push(`/card/${card.id}`);
};

// Cargar sets y cartas al montar
onMounted(() => {
  fetchSets();
  fetchCards();
});
</script>

<style scoped>
input, select {
  border: 1px solid #ccc;
}
</style>
