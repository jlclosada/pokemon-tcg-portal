<template>
  <div>
    <h2 class="text-3xl font-bold text-indigo-600 dark:text-indigo-300 text-center mb-6">
      🎮 Videos de Pokémon
    </h2>

    <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">
      Cargando videos...
    </div>

    <div v-if="error" class="text-center text-red-500">
      Error al cargar videos. Intenta nuevamente más tarde.
    </div>

    <div v-if="videos.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="video in videos" :key="video.id" class="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <iframe
          :src="`https://www.youtube.com/embed/${video.id}`"
          frameborder="0"
          allowfullscreen
          class="w-full h-52"
        ></iframe>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {{ video.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ video.channel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchYouTubeVideos } from "@/utils/youtubeApi";

const videos = ref([]);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    videos.value = await fetchYouTubeVideos();
  } catch (err) {
    console.error("Error al obtener videos:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí */
</style>
