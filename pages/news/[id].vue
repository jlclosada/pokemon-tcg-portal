<template>
  <div class="max-w-6xl mx-auto py-12 px-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl shadow-lg relative">

    <!-- Contenido principal -->
    <div class="relative z-10 text-left">
      <!-- Título de la noticia -->
      <h1 class="text-5xl font-extrabold text-yellow-600 dark:text-yellow-400 mb-6 transform hover:scale-105 transition-all">
        {{ news.title }}
      </h1>

      <!-- Fecha de la noticia -->
      <p class="text-lg italic mb-4">
        📅 {{ news.date }}
      </p>

      <!-- Imagen destacada -->
      <div v-if="news.image" class="my-8 overflow-hidden rounded-xl shadow-lg">
        <img :src="news.image" alt="Noticia Pokémon" class="w-full h-96 object-cover transform transition-transform hover:scale-110"/>
      </div>

      <!-- Contenido de la noticia -->
      <div v-html="news.content" class="mt-6 text-lg leading-relaxed max-w-3xl mx-auto prose dark:prose-invert">
      </div>
    </div>

    <!-- Sección de noticias relacionadas -->
    <div class="mt-16 relative z-10">
      <h3 class="text-3xl font-semibold text-indigo-700 dark:text-indigo-300 text-center mb-6">
        🔥 Noticias Relacionadas
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewsCard
          v-for="related in relatedNews"
          :key="related.id"
          :title="related.title"
          :date="related.date"
          :image="related.image"
          :link="`/news/${related.id}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { newsData } from "@/data/newsData";

const route = useRoute();
const news = ref({
  title: "",
  date: "",
  image: "",
  content: ""
});

const relatedNews = ref([]);

onMounted(() => {
  const newsId = route.params.id;
  const selectedNews = newsData.find((n) => n.id === newsId);
  if (selectedNews) {
    news.value = selectedNews;
    relatedNews.value = newsData.filter(n => n.id !== newsId);
  } else {
    console.error("Noticia no encontrada");
  }
});
</script>
