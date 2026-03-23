<template>
  <div>
    <h2 class="text-3xl font-bold text-gray-200 text-center mb-10">
      Últimos Videos
    </h2>

    <!-- Mensajes de estado -->
    <div v-if="loading" class="text-center text-gray-500 animate-pulse">
      <LoadingSpinner />
      <p>Cargando videos...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      Error al cargar videos. Inténtalo más tarde.
    </div>
    <div v-else-if="quotaExceeded" class="text-center text-yellow-400 font-bold mt-6">
      <p class="text-2xl mb-2">😭</p>
      Cuota de la API agotada. Inténtalo mañana.
      <br><span class="text-sm text-gray-400">Colabora con el proyecto para poder hacer más peticiones.</span>
    </div>

    <!-- Listado de videos -->
    <div v-else-if="videos.length">
      <div v-for="(channelVideos, channel) in groupedVideos" :key="channel"
        :id="`channel-${String(channel).replace(/\s+/g, '-')}`" class="mb-16">
        <h3 class="text-2xl font-semibold text-gray-200 mb-6 border-b border-gray-700 pb-2 flex items-center gap-3">
          <img v-if="getChannelLogo(String(channel))" :src="getChannelLogo(String(channel))"
            :alt="String(channel)" class="w-8 h-8 rounded-full" />
          {{ channel }}
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="video in channelVideos" :key="video.id"
            class="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-[1.03] transition-transform duration-300">
            <div class="relative w-full aspect-video">
              <iframe
                :src="`https://www.youtube.com/embed/${video.id}`"
                loading="lazy"
                style="border: 0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="absolute inset-0 w-full h-full">
              </iframe>
            </div>

            <div class="p-4 space-y-2">
              <h3 class="text-base font-bold text-gray-200 line-clamp-2">{{ decodeEntities(video.title) }}</h3>
              <a :href="video.channelUrl" target="_blank" rel="noopener noreferrer"
                class="text-gray-400 hover:text-yellow-400 hover:underline text-sm flex items-center gap-2 transition-colors">
                <span>{{ video.channel }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Si no hay videos -->
    <div v-else class="text-center text-gray-400 mt-8">
      <p class="text-lg">No hay videos disponibles en este momento.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits } from "vue";
import { fetchYouTubeVideos } from "@/utils/ytApi";
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();
const API_KEY = config.public.youtubeApiKey;

const videos = ref([]);
const loading = ref(true);
const error = ref(false);
const quotaExceeded = ref(false);
const emit = defineEmits(["update-channels"]);

// Decodificar entidades HTML en títulos de YouTube
const decodeEntities = (text) => {
  if (!text) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// Obtener logo de un canal por nombre
const getChannelLogo = (channelName) => {
  const video = videos.value.find(v => v.channel === channelName);
  return video?.channelLogo || '';
};

// Función para actualizar la lista de canales
const updateChannelList = () => {
  const uniqueChannels = Array.from(
    new Set(videos.value.map((video) => video.channel))
  ).map((channel) => {
    const firstVideo = videos.value.find((video) => video.channel === channel);
    return {
      name: channel,
      url: firstVideo?.channelUrl || "#",
      logo: firstVideo?.channelLogo || "",
    };
  });

  emit("update-channels", uniqueChannels);
};

onMounted(async () => {
  try {
    videos.value = await fetchYouTubeVideos(API_KEY);

    if (!videos.value.length) {
      quotaExceeded.value = true;
    }

    updateChannelList();
  } catch (err) {
    console.error("Error al obtener videos:", err);

    if (err?.response?.data?.error?.errors?.[0]?.reason === "quotaExceeded" ||
        err?.data?.error?.errors?.[0]?.reason === "quotaExceeded") {
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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
