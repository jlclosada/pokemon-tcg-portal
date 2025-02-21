<template>
  <aside class="w-64 h-screen bg-white dark:bg-gray-900 shadow-md p-4 fixed left-0 top-0 overflow-y-auto">
    <!-- Botón de desplegable -->
    <button
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between p-2 text-lg font-bold light:bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      <span class="ml-2">Colecciones</span>
      <Icon :name="isOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-5 h-5" />
    </button>

    <!-- Lista de colecciones -->
    <LoadingSpinner v-if="loading" />
    <ul v-else-if="error" class="text-red-500 mt-2">{{ error }}</ul>

    <Transition name="fade">
      <ul v-show="isOpen" class="space-y-2 mt-2">
        <li
          v-for="collection in collections"
          :key="collection.id"
          class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
          @click="goToCollection(collection.id)"
        >
          <div class="flex items-center gap-2">
            <img :src="collection.images.logo" :alt="collection.name" class="w-10 h-10 object-contain" />
            <span class="text-sm font-medium">{{ collection.name }}</span>
          </div>
        </li>
      </ul>
    </Transition>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const collections = ref([]);
const loading = ref(true);
const error = ref(null);
const isOpen = ref(false); // Estado del desplegable

onMounted(async () => {
  const { $apiClient } = useNuxtApp();
  try {
    const response = await $apiClient("/sets");
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

<style scoped>
/* Animación del desplegable */
.fade-enter-active, .fade-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  max-height: 0;
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
