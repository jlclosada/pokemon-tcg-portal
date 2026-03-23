<template>
  <div class="relative">
    <!-- Video de fondo con overlay gradiente -->
    <div class="video-bg">
      <video autoplay loop muted playsinline preload="auto" class="video">
        <source src="/videos/pokemon_bg.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-gray-900"></div>
    </div>

    <!-- Contenido principal -->
    <div class="relative z-10">
      <!-- Hero Section -->
      <section class="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div class="animate-fade-in-up">
          <img src="/images/pokeball.png" alt="Pokéball" class="w-20 h-20 mx-auto mb-6 animate-float" />
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-tight">
            <span class="text-pokemon-gradient">Pokémon</span> TCG Portal
          </h1>
          <p class="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explora la Pokédex, colecciona cartas, descubre videos y mantente al día con las últimas novedades del mundo Pokémon.
          </p>
          <div class="flex flex-wrap gap-4 justify-center mt-10">
            <ULink to="/pokedex" class="hero-btn hero-btn-primary">
              <span>🔍 Explorar Pokédex</span>
            </ULink>
            <ULink to="/cards" class="hero-btn hero-btn-secondary">
              <span>🃏 Ver Cartas</span>
            </ULink>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <!-- Categorías -->
      <section class="py-20 px-6 bg-gray-900">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-center text-white mb-4">Explora el Universo</h2>
          <p class="text-gray-400 text-center mb-16 text-lg max-w-xl mx-auto">Descubre todas las secciones disponibles</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard
              v-for="(cat, i) in categories"
              :key="cat.title"
              v-bind="cat"
              :style="{ animationDelay: `${i * 100}ms` }"
              class="animate-fade-in-up"
            />
          </div>
        </div>
      </section>

      <!-- Noticias -->
      <section id="news-section" class="py-20 px-6 bg-gray-950">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-center text-white mb-4">Últimas Novedades</h2>
          <p class="text-gray-400 text-center mb-16 text-lg">Las noticias más recientes del mundo Pokémon</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NewsCard
              v-for="(newsItem, i) in newsItems"
              :key="newsItem.id"
              v-bind="newsItem"
              :link="`/news/${newsItem.id}`"
              :style="{ animationDelay: `${i * 100}ms` }"
              class="animate-fade-in-up"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryCard from "~/components/CategoryCard.vue";
import NewsCard from "~/components/NewsCard.vue";
import { newsData } from "~/data/newsData";

const categories = [
  { title: "Pokédex", description: "Información detallada de cada Pokémon.", iconType: "image", icon: "/icons/pokedex.svg", link: "/pokedex" },
  { title: "Cartas TCG", description: "Colecciona y analiza cartas del TCG.", iconType: "image", icon: "/icons/deck.svg", link: "/cards" },
  { title: "Multimedia", description: "Videos de los mejores canales.", iconType: "icon", iconName: "play", link: "/media" },
  { title: "Noticias", description: "Últimas novedades Pokémon.", iconType: "icon", iconName: "newspaper", link: "/#news-section" },
  { title: "Competitivo", description: "Estrategias y meta actual.", iconType: "icon", iconName: "sparkles", link: "/maintenance" },
  { title: "Guías", description: "Tutoriales para entrenadores.", iconType: "icon", iconName: "book-open", link: "/maintenance" },
];

const newsItems = newsData.map(n => ({ id: n.id, title: n.title, date: n.date, image: n.image }));
</script>

<style scoped>
.video-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Botones hero */
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-weight: 700;
  font-size: 1.05rem;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}
.hero-btn-primary {
  background: linear-gradient(135deg, var(--pokemon-red), #c62828);
  color: white;
  box-shadow: 0 4px 20px rgba(227, 53, 13, 0.4);
}
.hero-btn-primary:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 8px 30px rgba(227, 53, 13, 0.6);
}
.hero-btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
}
.hero-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: var(--pokemon-yellow);
  transform: translateY(-3px);
}
</style>
