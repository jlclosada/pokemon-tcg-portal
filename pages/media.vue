<template>
  <div class="min-h-screen bg-dark-gradient text-white py-16 flex flex-col items-center">
    <h1 class="text-6xl font-extrabold text-center text-gray-100 mb-12 tracking-wide drop-shadow-glow animate-fadeIn">
      Media 🎥
    </h1>

    <!-- Listado dinámico de canales con logos -->
    <div v-if="channels.length" class="mb-10">
      <h2 class="text-xl font-semibold text-gray-300 mb-4 text-center">Canales Disponibles:</h2>
      <div class="flex flex-wrap gap-4 justify-center">
        <a
          v-for="channel in channels"
          :key="channel.id"
          @click.prevent="scrollToChannel(channel.name)"
          class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition cursor-pointer">
          <img :src="channel.logo" alt="Logo" class="w-6 h-6 rounded-full inline-block mr-2">
          {{ channel.name }}
        </a>
      </div>
    </div>

    <div v-if="activeTab === 'youtube'" class="w-full max-w-6xl">
      <YouTubeVideos @update-channels="updateChannels" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import YouTubeVideos from "@/components/media/YouTubeVideos.vue";

const activeTab = ref("youtube");
const channels = ref([]);

// Recibe los canales con logos desde YouTubeVideos.vue
const updateChannels = (channelList) => {
  channels.value = channelList;
};
// Función para hacer scroll a la sección del canal
const scrollToChannel = (channelName) => {
  const channelId = `channel-${channelName.replace(/\s+/g, '-')}`;
  const channelElement = document.getElementById(channelId);

  if (channelElement) {
    channelElement.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
