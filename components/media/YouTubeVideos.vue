<template>
  <div>
    <h2 class="text-3xl font-bold text-gray-200 text-center mb-10">
      Últimos Videos
    </h2>

    <!-- Mensajes de estado -->
    <div v-if="loading" class="text-center text-gray-500 animate-pulse">
      <LoadingSpinner />
    </div>
    <div v-if="error" class="text-center text-red-500">
      Error al cargar videos. Inténtalo más tarde.
    </div>
    <div v-if="quotaExceeded" class="text-center text-yellow-400 font-bold mt-6">
      Estamos tiesos 😭, colabora con el proyecto para poder hacer peticiones a las APIs.
      <br>Intentalo mañana, vale?
    </div>

    <!-- Listado de videos -->
    <div v-if="videos.length && !quotaExceeded">
      <div v-for="(channelVideos, channel) in groupedVideos" :key="channel" class="mb-16">
        <h3 class="text-2xl font-semibold text-gray-200 mb-6 border-b border-gray-700 pb-2">
          {{ channel }}
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="video in channelVideos" :key="video.id" class="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            <iframe
              :src="`https://www.youtube.com/embed/${video.id}`"
              frameborder="0"
              allowfullscreen
              class="w-full h-52 rounded-t-xl">
            </iframe>

            <div class="p-4 space-y-3">
              <h3 class="text-lg font-bold text-gray-200">{{ video.title }}</h3>
              <a :href="video.channelUrl" target="_blank" class="dark:text-gray-300 hover:underline text-sm flex items-center space-x-2">
                <span>📺 {{ video.channel }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Si no hay videos y no es error de cuota -->
    <div v-if="!loading && !videos.length && !quotaExceeded" class="text-center text-gray-400">
      No hay videos disponibles en este momento.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import { useNuxtApp } from "#app";

const { $youtube } = useNuxtApp(); // 🔥 Obtener la función desde el plugin

const videos = ref([]);
const loading = ref(true);
const error = ref(false);
const quotaExceeded = ref(false);
const emit = defineEmits(["update-channels"]);

onMounted(async () => {
  try {
    videos.value = await $youtube.fetchVideos(); // 👈 Usamos la función del plugin

    // Si la API no devolvió videos, mostramos el mensaje de cuota agotada
    if (!videos.value.length) {
      quotaExceeded.value = true;
    }

    updateChannelList();
  } catch (err) {
    console.error("Error al obtener videos:", err);

    // Si el error es de cuota, mostramos el mensaje especial
    if (err.response?.data?.error?.errors[0]?.reason === "quotaExceeded") {
      quotaExceeded.value = true;
    } else {
      error.value = true;
    }
  } finally {
    loading.value = false;
  }
});

// Agrupar videos por canal
const groupedVideos = computed(() => {
  return videos.value.reduce((acc, video) => {
    (acc[video.channel] = acc[video.channel] || []).push(video);
    return acc;
  }, {});
});

// Generar la lista de canales dinámicamente
const updateChannelList = () => {
  const uniqueChannels = Array.from(
    new Set(videos.value.map((video) => video.channel))
  ).map((channel) => {
    return {
      name: channel,
      url: videos.value.find((video) => video.channel === channel).channelUrl,
    };
  });

  emit("update-channels", uniqueChannels);
};
</script>
