<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
    <!-- Header -->
    <div class="text-center py-16 px-6">
      <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in-up">
        <span class="text-pokemon-gradient">Media</span> Center
      </h1>
      <p class="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
        Los mejores vídeos de los canales más populares de Pokémon TCG
      </p>
    </div>

    <!-- Chips de canales -->
    <div v-if="channels.length" class="px-6 pb-10">
      <div class="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
        <button
          v-for="channel in channels"
          :key="channel.name"
          @click="scrollToChannel(channel.name)"
          class="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-800/80 border border-gray-700/50 hover:border-yellow-400/50 hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,203,5,0.15)]"
        >
          <img v-if="channel.logo" :src="channel.logo" :alt="channel.name"
            class="w-7 h-7 rounded-full ring-2 ring-gray-600 group-hover:ring-yellow-400/50 transition-all" />
          <span class="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{{ channel.name }}</span>
        </button>
      </div>
    </div>

    <!-- Videos -->
    <div class="w-full max-w-7xl mx-auto px-6 pb-20">
      <YouTubeVideos @update-channels="updateChannels" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import YouTubeVideos from "@/components/media/YouTubeVideos.vue";

const channels = ref([]);

const updateChannels = (channelList) => {
  channels.value = channelList;
};

const scrollToChannel = (channelName) => {
  const el = document.getElementById(`channel-${channelName.replace(/\s+/g, '-')}`);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pokémon gradient text */
.text-pokemon-gradient {
  background: linear-gradient(90deg, #f9d423 0%, #ff4e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
