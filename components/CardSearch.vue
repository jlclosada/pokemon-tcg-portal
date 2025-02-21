<script setup lang="ts">
import { ref, defineEmits } from "vue";

// Definir rarezas disponibles (puedes modificarlas según tu API)
const rarities = [
  "All",
  "Common",
  "Uncommon",
  "Rare",
  "Ultra Rare",
  "Secret Rare",
];

// Valores reactivos para los filtros
const nameQuery = ref("");
const rarity = ref("All");
const cardNumber = ref("");

// Emitir cambios al padre
const emit = defineEmits(["update:filters"]);

const updateFilters = () => {
  emit("update:filters", {
    name: nameQuery.value,
    rarity: rarity.value === "All" ? "" : rarity.value,
    number: cardNumber.value,
  });
};
</script>

<template>
  <div class="flex flex-col md:flex-row gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
    <!-- Buscar por nombre -->
    <UInput
      v-model="nameQuery"
      placeholder="Buscar por nombre..."
      @input="updateFilters"
      class="w-full md:w-1/3"
    />

    <!-- Buscar por número de carta -->
    <UInput
      v-model="cardNumber"
      placeholder="Número de carta..."
      @input="updateFilters"
      class="w-full md:w-1/3"
    />

    <!-- Seleccionar rareza -->
    <USelect v-model="rarity" :options="rarities" @change="updateFilters" class="w-full md:w-1/3" />
  </div>
</template>
