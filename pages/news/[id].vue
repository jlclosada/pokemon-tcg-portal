<template>
  <div class="max-w-6xl mx-auto py-10 px-4">
    <!-- Título de la noticia -->
    <h1 class="text-5xl font-extrabold text-gray-900 dark:text-gray-300 mb-8 transition-transform transform hover:scale-105 hover:text-indigo-600">
      {{ news.title }}
    </h1>
    
    <!-- Fecha de la noticia -->
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 font-medium italic">
      {{ news.date }}
    </p>
    
    <!-- Imagen destacada -->
    <div v-if="news.image" class="my-8 overflow-hidden rounded-lg shadow-lg">
      <img :src="news.image" alt="Noticia" class="w-full h-96 object-cover transform transition-transform hover:scale-110"/>
    </div>
    
    <!-- Contenido de la noticia -->
    <div v-html="news.content" class="mt-8 text-gray-700 dark:text-gray-200 leading-relaxed text-xl max-w-full prose dark:prose-dark">
    </div>

    <!-- Sección de llamadas a la acción -->
    <div class="mt-16">
      <h3 class="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        Contenido Relacionado
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RelatedCard 
          v-for="related in relatedNews" 
          :key="related.id"
          :title="related.title" 
          :description="related.content.slice(0, 100) + '...'" 
          :image="related.image"
          :link="`/news/${related.id}`" 
          class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { newsData } from "@/data/newsData"; // Importar datos de noticias

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
    // Filtrar noticias relacionadas (todo menos la noticia actual)
    relatedNews.value = newsData.filter(n => n.id !== newsId);
  } else {
    console.error("Noticia no encontrada");
  }
});
</script>
