<template>
  <div class="max-w-4xl mx-auto py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ news.title }}</h1>
    <p class="text-sm text-gray-500 dark:text-gray-400">{{ news.date }}</p>
    <div v-if="news.image" class="my-6">
      <img :src="news.image" alt="Noticia" class="w-full h-96 object-cover" />
    </div>
    <div v-html="news.content" class="prose dark:prose-dark mt-6"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const news = ref({
  title: '',
  date: '',
  image: '',
  content: ''
});

onMounted(() => {
  const newsId = route.params.id;
  const selectedNews = newsData.find((n) => n.id === newsId);
  if (selectedNews) {
    news.value = selectedNews;
  }
});
</script>

<style scoped>
.prose {
  max-width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

.prose-dark {
  color: #ddd;
}
</style>
