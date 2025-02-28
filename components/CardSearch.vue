<script setup lang="ts">
import { ref, defineEmits, onMounted } from "vue";

// Definir opciones disponibles
const rarities = ["All", "Common", "Uncommon", "Rare", "Rare Holo", "Ultra Rare", "Secret Rare"];

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
  <div class="relative w-full max-w-4xl mx-auto p-6 rounded-2xl shadow-xl transition-all"
       :class="{ 'bg-gray-900/80 text-white': $colorMode.value === 'dark', 'bg-gray-100 text-gray-900': $colorMode.value === 'light' }">
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Campo de búsqueda por nombre -->
      <div class="relative">
        <input v-model="nameQuery" placeholder="Buscar carta..."
               @input="updateFilters"
               class="w-full p-3 bg-transparent border rounded-lg outline-none focus:ring-2 transition-all"
               :class="{ 'border-gray-500 focus:ring-blue-500 text-white': $colorMode.value === 'dark', 'border-gray-300 focus:ring-blue-600 text-gray-900': $colorMode.value === 'light' }" />
      </div>

      <!-- Campo de búsqueda por número -->
      <div class="relative">
        <input v-model="cardNumber" placeholder="Número de carta..."
               @input="updateFilters"
               class="w-full p-3 bg-transparent border rounded-lg outline-none focus:ring-2 transition-all"
               :class="{ 'border-gray-500 focus:ring-blue-500 text-white': $colorMode.value === 'dark', 'border-gray-300 focus:ring-blue-600 text-gray-900': $colorMode.value === 'light' }" />
      </div>

      <!-- Selector de rareza -->
      <div class="relative">
        <select v-model="rarity" @change="updateFilters"
                class="w-full p-3 bg-transparent border rounded-lg outline-none focus:ring-2 transition-all"
                :class="{ 'border-gray-500 focus:ring-blue-500 text-white': $colorMode.value === 'dark', 'border-gray-300 focus:ring-blue-600 text-gray-900': $colorMode.value === 'light' }">
          <option v-for="r in rarities" :key="r" :value="r">{{ r }}</option>
        </select>
      </div>
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
