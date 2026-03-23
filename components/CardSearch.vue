<script setup lang="ts">
import { ref, defineEmits, onMounted } from "vue";

// Definir opciones disponibles
const rarities = ["All", "Common", "Uncommon", "Rare", "Rare Holo", "Rare Holo EX", "Ultra Rare", "Secret Rare", "Illustration Rare"];

// Valores reactivos para los filtros
const nameQuery = ref("");
const rarity = ref("All");
const cardNumber = ref("");

// Emitir cambios al padre
const emit = defineEmits(["update:filters"]);

// Función para actualizar los filtros
const updateFilters = () => {
  // Limpiar los valores vacíos de los filtros
  const filters = {
    name: nameQuery.value.trim(),
    rarity: rarity.value === "All" ? "" : rarity.value,
    // Realizar la comparación exacta para el número de carta (como cadena)
    number: cardNumber.value.trim() === "" ? "" : cardNumber.value.trim() // Dejar vacío si no hay número
  };

  // Emitir los filtros al componente superior o al backend
  emit("update:filters", filters);
};

// Emitir los filtros iniciales cuando el componente se monta
onMounted(() => {
  updateFilters();
});
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-5 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/30 shadow-lg mt-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <!-- Búsqueda por nombre -->
      <input v-model="nameQuery" placeholder="🔍 Buscar carta..."
        @input="updateFilters"
        class="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all" />

      <!-- Búsqueda por número -->
      <input v-model="cardNumber" placeholder="# Número de carta"
        @input="updateFilters"
        class="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all" />

      <!-- Selector de rareza -->
      <select v-model="rarity" @change="updateFilters"
        class="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all appearance-none cursor-pointer">
        <option v-for="r in rarities" :key="r" :value="r" class="bg-gray-900 text-white">{{ r }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
/* Efecto sutil de neón */
input, select {
  box-shadow: 0 0 10px rgba(0, 153, 255, 0.2);
}
input:focus, select:focus {
  box-shadow: 0 0 15px rgba(0, 153, 255, 0.5);
}

/* Estilos para opciones dentro del select */
select option {
  background-color: white;
  color: black;
}

/* Modo oscuro: mejorar visibilidad de las opciones */
.dark select option {
  background-color: #1e1e1e; /* Fondo oscuro */
  color: white; /* Texto claro */
}
</style>
