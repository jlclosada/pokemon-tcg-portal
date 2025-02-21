<!-- components/CollectionsGrid.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 text-center mt-12">Colecciones de Pokémon TCG</h1>
    <!--Loading spinner-->
    <LoadingSpinner v-if="loading" />
    <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>

    <ul v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <li
        v-for="collection in collections"
        :key="collection.id"
        class="p-2 bg-white dark:bg-transparent rounded w-48 hover:scale-110 transition-all cursor-pointer"
        @click="goToCollection(collection.id)"
      >
        <img
          :src="collection.images.logo"
          :alt="collection.name"
          class="w-full h-24 object-contain rounded-md"
        />
        <p class="mt-2 text-center text-sm font-medium">{{ collection.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const collections = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    const response = await $apiClient("/sets"); // Endpoint para colecciones
    collections.value = response.data;
  } catch (err) {
    error.value = "No se pudieron obtener las colecciones.";
    console.error("Error al obtener las colecciones:", err);
  } finally {
    loading.value = false;
  }
});

const goToCollection = (collectionId: string) => {
  router.push(`/collection/${collectionId}`);
};
</script>
